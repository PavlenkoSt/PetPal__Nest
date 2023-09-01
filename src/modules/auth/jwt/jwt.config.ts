import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { IConfigService } from 'src/config/configuration';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private configService: ConfigService<IConfigService>) {}

  createJwtOptions(): JwtModuleOptions {
    const mode = this.configService.get('MODE', { infer: true });
    const isProduction = mode === 'production';

    return {
      secret: this.configService.get('JWT_SECRET', { infer: true }),
      signOptions: {
        expiresIn: isProduction ? '1h' : '1d',
      },
    };
  }
}
