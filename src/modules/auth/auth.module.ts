import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { env } from '../../shared/config/env'

import { DatabaseModule } from 'src/shared/database/database.module'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
