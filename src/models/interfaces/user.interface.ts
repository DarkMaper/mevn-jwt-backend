import { Document, Model, Types } from 'mongoose';
interface IUserDocument extends Document {
	_id: string;
	username: string;
	email: string;
	name: string;
	password: string;
	role: Types.ObjectId[];
	verification: string;
	verified: boolean;
	verificationExpires: Date;
	loginAttempts: number;
	blockExpires: Date;
}

export interface IUser extends IUserDocument {
	comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {}
