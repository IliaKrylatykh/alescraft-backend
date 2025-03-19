import { Injectable, NotFoundException } from '@nestjs/common';
import { returnCategoryObject } from './return-category.object';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: returnCategoryObject,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  // async bySlug(slug: string) {
  //   const category = await this.prisma.category.findUnique({
  //     where: {
  //       slug,
  //     },
  //     select: returnCategoryObject,
  //   });

  //   if (!category) {
  //     throw new NotFoundException('Category not found');
  //   }

  //   return category;
  // }

  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject,
    });
  }

  async create(dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        // slug: dto.name, // TODO: add slug
      },
    });
  }

  async update(id: number, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        // slug: dto.name, // TODO: add slug generator
      },
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
