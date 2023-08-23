import { ForbiddenException, Injectable } from '@nestjs/common';

import { S3FilesService } from 'src/aws/s3-files.service';
import { CertificatesRepository } from './certificates.repository';
import { ICurrentUser } from 'src/decorators/user.decorator';
import { PetsRepository } from '../pets/pets.repository';
import { FORBID_ASSIGN_CERTIFICATE } from './certificates.constants';

@Injectable()
export class CertificatesService {
  constructor(
    private readonly s3FilesService: S3FilesService,
    private readonly certificatesRepository: CertificatesRepository,
    private readonly petsRepository: PetsRepository,
  ) {}

  async upload(
    file: Express.Multer.File,
    petId: string,
    currentUser: ICurrentUser,
  ) {
    const { originalname, buffer } = file;

    const targetPet = await this.petsRepository.getById(petId);

    if (!targetPet) {
      throw new ForbiddenException({ message: FORBID_ASSIGN_CERTIFICATE });
    }

    const isCurrentUserOwner =
      String(targetPet.ownerId) === String(currentUser.id);

    if (!isCurrentUserOwner) {
      throw new ForbiddenException({ message: FORBID_ASSIGN_CERTIFICATE });
    }

    const uploaded = await this.s3FilesService.uploadFile(originalname, buffer);

    return this.certificatesRepository.create({ key: uploaded.Key, petId });
  }
}
