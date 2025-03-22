import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import {
  EnumProductsSort,
  GetAllProductsDto,
} from './dto/get-all-products.dto';
import { Prisma } from '@prisma/client';
import {
  // returnProductObject,
  returnProductObjectFullest,
} from './types/return-product.object';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async getAll(dto: GetAllProductsDto) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductsSort.LOW_PRICE) {
      prismaSort.push({ price: 'asc' });
    } else if (sort === EnumProductsSort.HIGH_PRICE) {
      prismaSort.push({ price: 'desc' });
    } else if (sort === EnumProductsSort.OLDEST) {
      prismaSort.push({ createdAt: 'asc' });
    } else {
      prismaSort.push({ createdAt: 'desc' });
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: returnProductObjectFullest,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      select: returnProductObjectFullest,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async byCategory(categorySlug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug: categorySlug,
      },
      select: returnProductObjectFullest,
    });

    if (!product) {
      throw new NotFoundException('Products not found');
    }

    return product;
  }

  // async getSimilar(id: number) {
  //   const currentProduct = await this.byId(id);

  //   if (!currentProduct) {
  //     throw new NotFoundException('Current product not found');
  //   }

  //   const products = await this.prisma.product.findMany({
  //     where: {
  //       category: {
  //         name: currentProduct.category.name,
  //       },
  //       NOT: {
  //         id: currentProduct.id,
  //       },
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     select: returnProductObject,
  //   });

  //   return products;
  // }

  async create(userId: number, dto: ProductDto) {
    const { name, description, price, images, categoryId } = dto;

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        images,
        slug: name, // TODO: slug
        user: {
          connect: {
            id: userId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return product;
  }

  async update(id: number, dto: ProductDto) {
    const { name, description, price, images, categoryId } = dto;

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        images,
        slug: name, // TODO: add slug generator,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
