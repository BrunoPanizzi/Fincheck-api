import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({
      data: createCategoryDto,
    })
  }

  findById(id: string) {
    return this.prismaService.category.findUnique({
      where: { id },
    })
  }

  findAllByUserId(userId: string) {
    return this.prismaService.category.findMany({
      where: {
        userId,
      },
    })
  }
}
