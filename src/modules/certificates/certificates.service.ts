import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

import { S3FilesService } from 'src/aws/s3-files.service';
import { CertificatesRepository } from './certificates.repository';
import { ICurrentUser } from 'src/decorators/user.decorator';
import { PetsRepository } from '../pets/pets.repository';
import {
  FORBID_ASSIGN_CERTIFICATE,
  NOT_FOUND_CERTIFICATE,
} from './certificates.constants';

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

  getAllByPetId(petId: string) {
    return this.certificatesRepository.getAllByPetId(petId);
  }

  async getById(id: string, res: Response) {
    const certificate = await this.certificatesRepository.getById(id);

    if (!certificate)
      throw new NotFoundException({
        message: NOT_FOUND_CERTIFICATE,
      });

    const stream = await this.s3FilesService.getFile(certificate.key);

    return stream.pipe(res as any);
  }

  async deleteById(id: string) {
    const targetCertificate = await this.certificatesRepository.deleteById(id);

    await this.s3FilesService.deleteFile(targetCertificate.key);
  }
}
