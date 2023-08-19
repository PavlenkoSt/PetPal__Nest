import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { ID_IS_NOT_VALID } from './id.validation.constants';

export class IdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ID_IS_NOT_VALID);
    }

    return value;
  }
}
