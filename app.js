const fs = require('fs');
const express = require('express');
const uuid = require('uuid');

const app = express();

// Middleware
app.use(express.json());

// app.get('/', (req, res) => {
// 	res.status(200).json({
// 		message: 'Hello from the server side!',
// 		app: 'Natur'
// 	});
// });

// app.post('/', (req, res) => {
// 	res.send('You can post to this end point...');
// });

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: { tours: tours }
	});
});

app.post('/api/v1/tours', (req, res) => {
	// console.log(req.body);
	const newTour = { ...req.body, id: uuid() };

	res.send('Done');
});

const port = 3000;

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
