import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'

import { BankAccountType } from '../entities/bank-account.entity'

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType
}
