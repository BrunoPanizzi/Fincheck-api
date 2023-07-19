import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string
}

export const env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
})

const errors = validateSync(env)

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}
