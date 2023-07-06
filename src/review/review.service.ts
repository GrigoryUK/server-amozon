import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { slugify } from '../../seeder/generate-slug';
import { returnReviewObject } from './constants/return-review.object';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  public async create(userId: number, dto: ReviewDto, productId: number) {
    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  public async getAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject,
    });
  }

  public async takeAverageValue(productId: number) {
    return this.prisma.review
      .aggregate({
        where: {
          productId,
        },
        _avg: {
          rating: true,
        },
      })
      .then((data) => data._avg);
  }
}
