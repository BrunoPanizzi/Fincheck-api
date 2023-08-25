import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllByUserId(userId: string) {
    return this.prismaService.category.findMany({
      where: {
        userId,
      },
    })
  }

  findById(userId: string, categoryId: string) {
    return this.prismaService.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    })
  }

  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({
      data: createCategoryDto,
    })
  }

  update(categoryId: string, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.prismaService.category.update({
      where: {
        id: categoryId,
      },
      data: updateCategoryDto,
    })
  }

  delete(categoryId: string) {
    return this.prismaService.category.delete({
      where: {
        id: categoryId,
      },
    })
  }
}
