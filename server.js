const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
	console.log('UNCAUGHT EXCEPTION 🥵 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DATABASE = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(connection => {
		// console.log(connection.connections);
		console.log('Database connection successful!');
	});

const port = process.env.PORT || 3300;

const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
	console.log('UNHANDLED REJECTION 🥵 Shutting down...');
	console.log(err.name, err.message);
	server.close(() => process.exit(1));
});

