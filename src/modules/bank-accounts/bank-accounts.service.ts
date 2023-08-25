import { Injectable, NotFoundException } from '@nestjs/common'

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository'

import { CreateBankAccountDto } from './dto/create-bank-account.dto'
import { UpdateBankAccountDto } from './dto/update-bank-account.dto'

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findAllByUserId(userId)
  }

  async findOne(userId: string, bankAccountId: string) {
    const bankAccount = await this.validateBankAccountOwnership(
      userId,
      bankAccountId,
    )

    return bankAccount
  }

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsRepository.create(userId, createBankAccountDto)
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnership(userId, bankAccountId)

    return this.bankAccountsRepository.update(
      bankAccountId,
      updateBankAccountDto,
    )
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId)

    return this.bankAccountsRepository.delete(bankAccountId)
  }

  private async validateBankAccountOwnership(
    userId: string,
    bankAccountId: string,
  ) {
    const bankAccount = await this.bankAccountsRepository.findById(
      userId,
      bankAccountId,
    )

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found')
    }

    return bankAccount
  }
}
