import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './interfaces/user.interface';
import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
		loginAttempts: { type: Number, default: 0 },
		verification: { type: String },
		verificationExpires: { type: Date },
		blockExpires: { type: Date },
		role: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

UserSchema.pre<IUser>('save', async function (done) {
	if (!this.isModified('password')) done();

	try {
		const salt = await bcrypt.genSalt(12);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
		done();
	} catch (error) {
		done(error);
	}
});

UserSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

export default <IUserModel>model<IUser>('User', UserSchema);
