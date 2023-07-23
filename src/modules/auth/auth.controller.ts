import { Body, Controller, Post } from '@nestjs/common'

import { IsPublic } from 'src/shared/decorators/IsPublic'

import { AuthService } from './auth.service'

import { SinginDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @IsPublic()
  async signin(@Body() signinDto: SinginDto) {
    return this.authService.signin(signinDto)
  }

  @Post('signup')
  @IsPublic()
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }
}
