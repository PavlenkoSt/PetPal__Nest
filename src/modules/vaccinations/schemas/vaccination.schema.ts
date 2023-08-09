import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type VaccinationDocument = HydratedDocument<Vaccination>;

@Schema()
export class Vaccination {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({
    required: true,
    ref: 'Pet',
    type: NativeSchema.Types.ObjectId,
  })
  petId: string;
}

export const VaccinationSchema = SchemaFactory.createForClass(Vaccination);
