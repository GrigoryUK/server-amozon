import { Prisma } from '@prisma/client';
import { returnReviewObject } from '../../review/constants/return-review.object';
import { returnCategoryObject } from '../../category/constants/return-category.object';

export const returnProductObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true,
};

export const returnProductObjectFullest: Prisma.ProductSelect = {
  ...returnProductObject,
  reviews: {
    select: {
      ...returnReviewObject,
    },
  },
  category: {
    select: {
      ...returnCategoryObject,
    },
  },
};
