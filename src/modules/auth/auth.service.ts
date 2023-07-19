import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'

import { UserRepository } from 'src/shared/database/repositories/users.repository'

import { SinginDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SinginDto) {
    const { email, password } = signinDto

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMatches = await compare(password, user.password)

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const token = await this.generateToken(user.id)

    return { token }
  }

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto

    const emailTaken = await this.usersRepository.findByEmail(email)

    if (emailTaken) throw new ConflictException('Email already taken')

    const hashedPassowrd = await hash(password, 10)

    const user = await this.usersRepository.create({
      email: email,
      name: name,
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

    const token = await this.generateToken(user.id)

    return { token }
  }

  private async generateToken(userId: string) {
    return this.jwtService.signAsync({
      sub: userId,
    })
  }
}
