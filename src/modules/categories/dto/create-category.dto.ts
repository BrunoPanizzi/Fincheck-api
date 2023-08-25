import { IsString, IsEnum, IsNotEmpty } from 'class-validator'

import { CategoryType } from '../entities/category.entity'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  icon: string

  @IsNotEmpty()
  @IsEnum(CategoryType)
  type: CategoryType
}
