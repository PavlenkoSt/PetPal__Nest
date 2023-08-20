import { ObjectId } from 'mongodb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pet } from '../pets/schemas/pet.schema';
import { PET_NOT_FOUND } from '../pets/pets.constants';

const aggregatingMedication = [
  {
    $project: {
      ownerId: false,
    },
  },
  {
    $lookup: {
      from: 'allergies',
      localField: '_id',
      foreignField: 'petId',
      as: 'allergies',
      pipeline: [
        {
          $project: {
            petId: false,
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'vaccinations',
      localField: '_id',
      foreignField: 'petId',
      as: 'vaccinations',
      pipeline: [
        {
          $project: {
            petId: false,
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'vetvisits',
      as: 'vet-visited',
      localField: '_id',
      foreignField: 'petId',
      pipeline: [
        {
          $match: {
            isDone: true,
          },
        },
        {
          $project: {
            petId: false,
          },
        },
      ],
    },
  },
];

@Injectable()
export class MedicationHistoryRepository {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<Pet>) {}

  async findForAllPets(userId: string) {
    const result = await this.petModel.aggregate([
      {
        $match: {
          ownerId: new ObjectId(userId),
        },
      },
      ...aggregatingMedication,
    ]);

    return result;
  }

  async findByPetId(petId: string) {
    const result = await this.petModel
      .aggregate([
        {
          $match: {
            _id: new ObjectId(petId),
          },
        },
        ...aggregatingMedication,
      ])
      .exec();

    const item = result[0];

    if (!item) {
      throw new NotFoundException({
        message: PET_NOT_FOUND,
      });
    }

    return item;
  }
}
