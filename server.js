const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

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

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
