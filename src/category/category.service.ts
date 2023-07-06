import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { returnCategoryObject } from './constants/return-category.object';
import { CategoryDto } from './dto/category.dto';
import { slugify } from '../../seeder/generate-slug';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  public async byId(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        ...returnCategoryObject,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  public async bySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: {
        ...returnCategoryObject,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  public async create() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: '',
      },
    });
  }

  public async update(id: number, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: slugify(dto.name),
      },
    });
  }

  public async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject,
    });
  }

  public async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
