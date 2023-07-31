import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { ConfigurationEnum } from 'src/config/configuration';
import { JWT_SECRET } from '../auth.contants';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    const mode = this.configService.get<string>(ConfigurationEnum.MODE);
    const isProduction = mode === 'production';

    return {
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: isProduction ? '1h' : '30s',
      },
    };
  }
}
