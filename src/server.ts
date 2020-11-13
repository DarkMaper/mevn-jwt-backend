import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import './database';
import './config/passport';

import AuthRoutes from './routes/auth.routes';
import { createRoles, createAdminUser } from './lib/initialConfig';

export default class App {
	private app: Application;
	private authRoutes: AuthRoutes;
	private cookieSecret: string;
	private port: number;

	constructor(port = 3000) {
		this.app = express();
		this.port = parseInt(process.env.PORT || `${port}`);
		this.authRoutes = new AuthRoutes();
		createRoles();
		createAdminUser();
		this.cookieSecret = process.env.COOKIE_SECRET || 'replacethis';
		this.middlewares();
		this.routes();
	}

	private middlewares(): void {
		this.app.use(morgan('dev'));
		this.app.use(
			cors({
				origin: ['http://localhost:8080'],
				credentials: true,
			}),
		);
		this.app.use(helmet());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
		this.app.use(cookieParser(this.cookieSecret));
	}

	private routes() {
		this.app.use('/api/auth', this.authRoutes.router);
	}

	listen(): void {
		this.app.listen(this.port);
		console.log('Server listening in port', this.port);
	}
}
