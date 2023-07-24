import { Module } from '@nestjs/common'

import { DatabaseModule } from 'src/shared/database/database.module'

import { BankAccountsService } from './bank-accounts.service'
import { BankAccountsController } from './bank-accounts.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountsController],
  providers: [BankAccountsService],
})
export class BankAccountsModule {}
