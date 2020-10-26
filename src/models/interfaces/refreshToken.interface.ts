import { Document, Model, Types } from 'mongoose';

interface IRefreshTokenDocument extends Document {
	userId: Types.ObjectId;
	refreshToken: string;
	ip: string;
	browser: string;
	country: string;
}

export interface IRefreshToken extends IRefreshTokenDocument {}

export interface IRefreshTokenModel extends Model<IRefreshToken> {}
