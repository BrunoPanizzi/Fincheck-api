import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUser: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: createUser,
    })
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    })
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    })
  }
}
