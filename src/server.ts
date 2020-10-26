import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import './database';
import AuthRoutes from './routes/auth.routes';

export default class App {
	private app: Application;
	private authRoutes: AuthRoutes;

	constructor() {
		this.app = express();
		this.authRoutes = new AuthRoutes();
		this.middlewares();
		this.routes();
	}

	private middlewares(): void {
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(morgan('dev'));
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
	}

	private routes() {
		this.app.use('/api/auth', this.authRoutes.router);
	}

	listen(): void {
		this.app.listen(3000);
		console.log('Server listening in port 3000');
	}
}
