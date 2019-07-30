const fs = require('fs');
const express = require('express');
const uuid = require('uuid');

const app = express();

// Middleware
app.use(express.json());

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: { tours: tours }
	});
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
	.route('/api/v1/tours/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);
	
const port = 3300;

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
