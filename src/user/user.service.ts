import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { UserDto } from './dto/user.dto';
import { returnUserObject } from './constants/return-user.object';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async searchById(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: true,
          },
        },
        ...selectObject,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this.searchById(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async toggleFavorite(userId: number, productId: number) {
    const user = await this.searchById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isExists = user.favorites.some((product) => product.id === productId);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    });

    return 'Success';
  }
}
