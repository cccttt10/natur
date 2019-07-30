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

app.get('/api/v1/tours/:id', (req, res) => {
	const tour = tours.find(tour => tour.id === req.params.id);
	if (tour)
		res.status(200).json({
			status: 'success',
			data: { tour }
		});
	else
		res
			.status(404)
			.json({ status: 'fail', message: 'Invalid ID' });
});

app.post('/api/v1/tours', (req, res) => {
	const newTour = { ...req.body, id: uuid() };
	tours.push(newTour);

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		err => {
			if (err) return console.log(err);
			res
				.status(201)
				.json({ status: 'success', data: { tour: newTour } });
		}
	);
});

app.patch('/api/v1/tours/:id', (req, res) => {
	const tour = tours.find(tour => tour.id === req.params.id);
	if (tour)
		res.status(200).json({
			status: 'success',
			data: {
				tour: '<Updated tour here...>'
			}
		});
	else
		res
			.status(404)
			.json({ status: 'fail', message: 'Invalid ID' });
});

app.delete('/api/v1/tours/:id', (req, res) => {
	const tour = tours.find(tour => tour.id === req.params.id);
	if (tour)
		res.status(204).json({
			status: 'success',
			data: null
		});
	else
		res 
			.status(404)
			.json({ status: 'fail', message: 'Invalid ID' });
});

const port = 3300;

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
