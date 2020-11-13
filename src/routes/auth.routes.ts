import { Router } from 'express';
import AuthController from '../controllers/auth.controllers';
import { isAuthenticated } from '../middlewares/authorization';

export default class AuthRoutes {
	public router: Router;
	private authController: AuthController;

	constructor() {
		this.router = Router();
		this.authController = new AuthController();
		this.routes();
	}

	private routes = async () => {
		this.router.post('/login', this.authController.loginUser);
		this.router.post('/logout', this.authController.logout);
		this.router.get('/refresh', this.authController.refreshToken);
		this.router.get('/test', isAuthenticated, (req, res) => {
			res.json({ message: '' });
		});
	};
}
