import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { IConfigService } from 'src/config/configuration';
import { JWT_SECRET } from '../auth.contants';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private configService: ConfigService<IConfigService>) {}

  createJwtOptions(): JwtModuleOptions {
    const mode = this.configService.get('MODE', { infer: true });
    const isProduction = mode === 'production';

    return {
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: isProduction ? '1h' : '1d',
      },
    };
  }
}
