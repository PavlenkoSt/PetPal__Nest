import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type CertificateDocument = HydratedDocument<Certificate>;

@Schema()
export class Certificate {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  uploadedAt: string;

  @Prop({
    required: true,
    ref: 'Pet',
    type: NativeSchema.Types.ObjectId,
    unique: false,
  })
  petId: string;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
