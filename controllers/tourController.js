const fs = require('fs');
const uuid = require('uuid');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		results: tours.length,
		data: { tours: tours }
	});
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
