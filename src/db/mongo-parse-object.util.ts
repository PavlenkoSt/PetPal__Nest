import { Document } from 'mongoose';

export const mongoParseObject = (doc: Document) => {
  const object = doc.toObject();

  if (object._id) {
    object.id = object._id;
    delete object._id;
  }

  return object;
};
