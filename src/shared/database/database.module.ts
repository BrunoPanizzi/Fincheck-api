import { Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'

import { UserRepository } from './repositories/users.repository'
import { CategoriesRepository } from './repositories/categories.repository'
import { BankAccountsRepository } from './repositories/bank-accounts.repository'

@Module({
  providers: [
    PrismaService,
    UserRepository,
    CategoriesRepository,
    BankAccountsRepository,
  ],
  exports: [UserRepository, CategoriesRepository, BankAccountsRepository],
})
export class DatabaseModule {}
