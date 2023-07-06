import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  public async getMain(userId: number) {
    const user = await this.userService.searchById(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
    });

    return [
      {
        name: 'Orders',
        value: user.orders.length,
      },
      {
        name: 'Reviews',
        value: user.reviews.length,
      },
      {
        name: 'Favorites',
        value: user.favorites.length,
      },
      {
        name: 'Total amount',
        value: 1000,
      },
    ];
  }
}
