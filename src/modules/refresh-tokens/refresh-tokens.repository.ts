import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshToken } from './schemas/refresht-tokens.schema';
import { CreateTokenDto } from './dto/create-token.dto';
import { DeleteTokenDto } from './dto/delete-token.dto';

@Injectable()
export class RefreshTokensRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  get(token: string) {
    return this.refreshTokenModel.findOne({ token });
  }

  add(dto: CreateTokenDto) {
    return this.refreshTokenModel.create(dto);
  }

  delete(dto: DeleteTokenDto) {
    return this.refreshTokenModel
      .findOneAndDelete({
        token: dto.token,
        userId: new ObjectId(dto.userId),
      })
      .exec();
  }

  deleteAllExpired() {
    const now = new Date();
    return this.refreshTokenModel
      .deleteMany({ expiresAt: { $lte: now } })
      .exec();
  }
}
