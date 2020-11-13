import { Response, Request } from 'express';
import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { IUserModel } from '../models/interfaces/user.interface';
import { IRefreshTokenModel } from '../models/interfaces/refreshToken.interface';
import { LoginRequest } from './interfaces/auth.interfaces';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { getClientIp } from 'request-ip';

export default class AuthController {
	private refreshModel: IRefreshTokenModel;
	private userModel: IUserModel;
	private jwtSecret: string;

	constructor() {
		this.refreshModel = RefreshToken;
		this.userModel = User;
		this.jwtSecret = process.env.JWT_SECRET || 'secret';
	}

	loginUser = async (req: LoginRequest, res: Response): Promise<void> => {
		const { email, password } = req.body;

		const user = await this.userModel.findOne({ email });

		if (user) {
			if (user.comparePassword(password)) {
				const payload = {
					id: user._id,
					role: user.role,
				};
				const refreshToken = new this.refreshModel({
					userId: user._id,
					refreshToken: v4(),
					ip: this.getIp(req),
					browser: this.getBrowserInfo(req),
				});
				await refreshToken.save();
				const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '10s' });

				res.cookie('token', token, { httpOnly: true });
				res.cookie('session', refreshToken.refreshToken, { httpOnly: true });

				res.json({ message: 'Session successfully' });
			} else {
				res.status(403).json({ message: 'User or password is not valid' });
			}
		} else {
			res.status(403).json({ message: 'User or password is not valid' });
		}
	};

	refreshToken = async (req: Request, res: Response): Promise<void> => {
		const refreshToken = await this.refreshModel.findOne({
			refreshToken: req.cookies.session,
		});

		if (refreshToken) {
			const user = await this.userModel.findOne({ _id: refreshToken.userId });
			if (user) {
				const payload = {
					id: user._id,
					role: user.role,
				};
				const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '10s' });

				res.cookie('token', token, { httpOnly: true });

				res.status(204).json({});
			} else {
				res.cookie('session', '', { expires: new Date(Date.now()) });
				res.cookie('token', '', { expires: new Date(Date.now()) });
				res.status(404).json({ error: 'User not found' });
			}
		} else {
			res.cookie('token', '', { expires: new Date(Date.now()) });
			res.status(403).json({ error: 'Session closed' });
		}
	};

	logout = async (req: Request, res: Response): Promise<void> => {
		const refreshToken = req.cookies['session'];

		if (refreshToken) {
			await this.refreshModel.deleteOne({ refreshToken });
			res.cookie('session', '', { httpOnly: true, expires: new Date(Date.now()) });
			res.cookie('token', '', { httpOnly: true, expires: new Date(Date.now()) });

			res.json({ message: 'Session logout' });
		} else {
			res.json({ message: 'Session not exists' });
		}
	};

	private getIp(req: LoginRequest): string {
		return getClientIp(req) || 'XX';
	}

	private getBrowserInfo(req: LoginRequest): string {
		return req.headers['user-agent'] || 'XX';
	}
}
