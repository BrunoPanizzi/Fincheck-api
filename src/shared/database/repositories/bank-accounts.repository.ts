import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(userId: string, bankAccountId: string) {
    return this.prismaService.bankAccount.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    })
  }

  findAllByUserId(userId: string) {
    return this.prismaService.bankAccount.findMany({
      where: {
        userId,
      },
    })
  }

  create(createBankAccountDto: Prisma.BankAccountCreateInput) {
    return this.prismaService.bankAccount.create({
      data: createBankAccountDto,
    })
  }

  update(
    bankAccountId: string,
    updateBankAccountDto: Prisma.BankAccountUpdateInput,
  ) {
    return this.prismaService.bankAccount.update({
      where: {
        id: bankAccountId,
      },
      data: updateBankAccountDto,
    })
  }

  delete(bankAccountId: string) {
    return this.prismaService.bankAccount.delete({
      where: {
        id: bankAccountId,
      },
    })
  }
}
