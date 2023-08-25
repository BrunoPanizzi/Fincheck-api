import { Injectable, NotFoundException } from '@nestjs/common'

import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository'

import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepository.findAllByUserId(userId)
  }

  findById(userId: string, categoryId: string) {
    return this.validateCategoryOwnership(userId, categoryId)
  }

  create(userId: string, createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.create(userId, createCategoryDto)
  }

  async update(
    userId: string,
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.validateCategoryOwnership(userId, categoryId)

    return this.categoriesRepository.update(categoryId, updateCategoryDto)
  }

  async remove(userId: string, categoryId: string) {
    await this.validateCategoryOwnership(userId, categoryId)

    return this.categoriesRepository.delete(categoryId)
  }

  private async validateCategoryOwnership(userId: string, categoryId: string) {
    const category = await this.categoriesRepository.findById(
      userId,
      categoryId,
    )

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    return category
  }
}
