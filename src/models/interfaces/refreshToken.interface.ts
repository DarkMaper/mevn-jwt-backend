import { Document, Model } from 'mongoose';

interface IRefreshTokenDocument extends Document {
	userId: string;
	refreshToken: string;
	ip: string;
	browser: string;
}

export interface IRefreshToken extends IRefreshTokenDocument {}

export interface IRefreshTokenModel extends Model<IRefreshToken> {}
