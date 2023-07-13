import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

import { UserRepository } from 'src/shared/database/repositories/users.repository'

import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const emailTaken = await this.userRepository.findByEmail(
      createUserDto.email,
    )

    if (emailTaken) throw new ConflictException('Email already taken')

    const hashedPassowrd = await hash(createUserDto.password, 10)

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassowrd,
      categories: {
        createMany: {
          data: [
            { name: 'Salário', icon: 'travel', type: 'INCOME' },
            { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
            { name: 'Outro', icon: 'other', type: 'INCOME' },
            { name: 'Casa', icon: 'home', type: 'EXPENSE' },
            { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
            { name: 'Educação', icon: 'education', type: 'EXPENSE' },
            { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
            { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
            { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
            { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
            { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
            { name: 'Outro', icon: 'other', type: 'EXPENSE' },
          ],
        },
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}