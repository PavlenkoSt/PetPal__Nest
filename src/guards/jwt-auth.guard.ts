import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { JwtBlacklistService } from 'src/modules/jwt-blacklist/jwt-blacklist.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtBlacklistService: JwtBlacklistService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')?.[1];

    if (token && this.jwtBlacklistService.isAccessTokenBlacklisted(token)) {
      throw new UnauthorizedException();
    }

    return super.canActivate(context);
  }
}
