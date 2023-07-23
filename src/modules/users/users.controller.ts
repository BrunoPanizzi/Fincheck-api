import { Controller, Get, Req } from '@nestjs/common'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@Req() request: any) {
    const id = request.userId as string

    return await this.usersService.getUserById(id)
  }
}
