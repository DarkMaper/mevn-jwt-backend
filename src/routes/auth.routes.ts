import { Router } from 'express';
import AuthController from '../controllers/auth.controllers';

export default class AuthRoutes {
	public router: Router;
	private authController: AuthController;

	constructor() {
		this.router = Router();
		this.authController = new AuthController();
		this.routes();
	}

	private routes = async () => {
		console.log('Routes called');
		this.router.post('/login', this.authController.loginUser);
	};
}
