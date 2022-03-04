import { Model } from 'objection';

export class BaseEntity extends Model {
  updatedAt: string;

  createdAt: string;
}
