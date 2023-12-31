import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common'

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId'

import { BankAccountsService } from './bank-accounts.service'

import { CreateBankAccountDto } from './dto/create-bank-account.dto'
import { UpdateBankAccountDto } from './dto/update-bank-account.dto'

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId)
  }

  @Get(':bankAccountId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.findOne(userId, bankAccountId)
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto)
  }

  @Put(':bankAccountId')
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountDto,
    )
  }

  @Delete(':bankAccountId')
  @HttpCode(204)
  remove(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId)
  }
}
