const fs = require('fs');
const express = require('express');
const uuid = require('uuid');
const morgan = require('morgan');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
	console.log('Hello from the middleware!');
	next();
});
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS
const getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
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

const getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};
const getUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};
const createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};
const updateUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};
const deleteUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
};

// ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
	.route('/api/v1/tours/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
	.route('/api/v1/users/:id')
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser);

// START SERVER
const port = 3300;

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
