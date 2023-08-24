import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Certificate } from './schemas/certificate.schema';

@Injectable()
export class CertificatesRepository {
  constructor(
    @InjectModel(Certificate.name)
    private readonly certificateModel: Model<Certificate>,
  ) {}

  create({ key, petId }: { key: string; petId: string }) {
    return this.certificateModel.create({
      key,
      petId,
      uploadedAt: new Date().toISOString(),
    });
  }

  getAllByPetId(petId: string) {
    return this.certificateModel.find({ petId });
  }
}
