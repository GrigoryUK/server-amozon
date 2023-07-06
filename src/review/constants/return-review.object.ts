import { Prisma } from '@prisma/client';
import { returnUserObject } from '../../user/constants/return-user.object';

export const returnReviewObject: Prisma.ReviewSelect = {
  user: {
    select: {
      ...returnUserObject,
    },
  },
  createdAt: true,
  id: true,
  text: true,
  rating: true,
};
