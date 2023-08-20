import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as NativeSchema, HydratedDocument } from 'mongoose';

export type VetVisitDocument = HydratedDocument<VetVisit>;

@Schema()
export class VetVisit {
  @Prop({ required: true, type: String })
  dateTime: string;

  @Prop({ required: false, type: String, default: '' })
  description: string;

  @Prop({ required: true, type: String })
  clinicName: string;

  @Prop({ required: true, type: NativeSchema.Types.ObjectId, ref: 'Pet' })
  petId: string;

  @Prop({ required: true, type: NativeSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: false, default: false, type: Boolean })
  isDone: boolean;
}

export const VetVisitSchema = SchemaFactory.createForClass(VetVisit);

VetVisitSchema.virtual('pet', {
  ref: 'Pet',
  localField: 'petId',
  foreignField: '_id',
  justOne: true,
});

VetVisitSchema.set('toJSON', { virtuals: true });
VetVisitSchema.set('toObject', { virtuals: true });
VetVisitSchema.set('id', false);
