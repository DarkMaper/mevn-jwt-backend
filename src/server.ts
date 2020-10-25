import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import './database';

export default class App {
	private app: Application;

	constructor() {
		this.app = express();
		this.middlewares();
	}

	private middlewares(): void {
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(morgan('dev'));
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
	}

	listen(): void {
		this.app.listen(3000);
		console.log('Server listening in port 3000');
	}
}
