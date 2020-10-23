import express, { Application } from 'express';

import './database';

export default class App {
	private app: Application;
	constructor() {
		this.app = express();
	}

	listen(): void {
		this.app.listen(3000);
		console.log('Server listening in port 3000');
	}
}
