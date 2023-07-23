import { Injectable } from '@nestjs/common'

import { UserRepository } from 'src/shared/database/repositories/users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserById(id: string) {
    const user = await this.usersRepository.findById(id)

    return {
      name: user.name,
      email: user.email,
    }
  }
}
