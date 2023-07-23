import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'

export const ActiveUserId = createParamDecorator<never, never, string>(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    const userId = request.userId

    if (!userId || typeof userId !== 'string') {
      throw new UnauthorizedException()
    }

    return userId
  },
)
