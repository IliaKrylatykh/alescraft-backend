import { Prisma } from '@prisma/client';
import { returnCategoryObject } from 'src/modules/category/types/return-category.object';

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  description: true,
  price: true,
  images: true,
  createdAt: true,
  slug: true,
};

export const returnProductObjectFullest: Prisma.ProductSelect = {
  ...returnProductObject,
  category: { select: returnCategoryObject },
};
