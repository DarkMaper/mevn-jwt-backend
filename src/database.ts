import mongoose from 'mongoose';

const mongoUri: string = process.env.MONGO_URI || 'mongodb://localhost/testing';

mongoose
	.connect(mongoUri, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('Database connected'))
	.catch((err) => console.log(err));
