import { Response } from 'express';
import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { IUserModel } from '../models/interfaces/user.interface';
import { IRefreshTokenModel } from '../models/interfaces/refreshToken.interface';
import { LoginRequest } from './interfaces/auth.interfaces';

export default class AuthController {
	private refreshModel: IRefreshTokenModel;
	private userModel: IUserModel;

	constructor() {
		this.refreshModel = RefreshToken;
		this.userModel = User;
	}

	loginUser = async (req: LoginRequest, res: Response): Promise<void> => {
		const { email, password } = req.body;

		const user = await this.userModel.findOne({ email });

		if (user) {
			if (user.comparePassword(password)) {
				res.json({ message: 'Login!' });
			}
		} else {
			res.json({ message: 'No existe el usuario' });
		}
	};
}
