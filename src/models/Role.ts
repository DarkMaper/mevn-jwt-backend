import { Schema, model } from 'mongoose';
import { IRole, IRoleModel } from './interfaces/role.interface';

const RoleSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export default <IRoleModel>model<IRole>('Role', RoleSchema);
