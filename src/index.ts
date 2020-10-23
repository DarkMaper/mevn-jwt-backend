import 'dotenv/config';
import App from './server';

async function bootstrap() {
	const app = new App();
	app.listen();
}
bootstrap();
