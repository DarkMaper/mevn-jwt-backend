import { Schema, model } from 'mongoose';
import { IRefreshToken, IRefreshTokenModel } from './interfaces/refreshToken.interface';

const RefreshTokenSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		refreshToken: { type: String, required: true },
		ip: { type: String, required: true },
		browser: { type: String, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export default <IRefreshTokenModel>model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
