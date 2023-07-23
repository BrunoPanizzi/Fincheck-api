import { Module } from '@nestjs/common'

import { DatabaseModule } from 'src/shared/database/database.module'

import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
