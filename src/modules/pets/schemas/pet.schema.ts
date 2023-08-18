import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema()
export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  breed: string;

  @Prop({
    required: true,
    ref: 'User',
    type: NativeSchema.Types.ObjectId,
    unique: false,
  })
  ownerId: NativeSchema.Types.ObjectId;

  @Prop({
    type: [{ type: NativeSchema.Types.ObjectId, ref: 'Vaccination' }],
    unique: true,
    default: [],
  })
  vaccinationIds: NativeSchema.Types.ObjectId[];
}

export const PetSchema = SchemaFactory.createForClass(Pet);
