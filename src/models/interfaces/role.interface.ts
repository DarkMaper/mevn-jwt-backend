import { Document, Model } from 'mongoose';

interface IRoleDocument extends Document {
	name: string;
}

export interface IRole extends IRoleDocument {}

export interface IRoleModel extends Model<IRole> {}
