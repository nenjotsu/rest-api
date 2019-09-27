import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MONGO } from '@common/constants';
import {
  ICreateRestModel,
  CreateRestModel,
  IRestID,
} from '../../modules/rest/models/create.model';

@Injectable()
export class RestServiceQueries {
  constructor(
    @Inject(MONGO.REST_MODEL)
    private readonly model: typeof Model,
  ) {}

  async getAllRest(): Promise<CreateRestModel[]> {
    const records = await this.model.find().exec();
    // .limit(10)
    return records;
  }

  async getSingleRest(id: IRestID): Promise<ICreateRestModel> {
    const records = await this.model
      .findById(id)
      .select('-__v')
      .exec();
    return records;
  }
}
