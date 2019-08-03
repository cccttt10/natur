const uuid = require('uuid');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
// 	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime
		// results: tours.length,
		// data: { tours: tours }
	});
};

exports.getTour = (req, res) => {
	// const tour = tours.find(tour => tour.id === req.params.id);
	// res.status(200).json({
	// 	status: 'success',
	// 	data: { tour }
	// });
};

exports.createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);
		res
			.status(201)
			.json({ status: 'success', data: { tour: newTour } });
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data sent'
		});
	}
	// const newTour = { ...req.body, id: uuid() };
	// tours.push(newTour);

	// fs.writeFile(
	// 	`${__dirname}/../dev-data/data/tours-simple.json`,
	// 	JSON.stringify(tours),
	// 	err => {
	// 		if (err) return console.log(err);
	// 		res
	// 			.status(201)
	// 			.json({ status: 'success', data: { tour: newTour } });
	// 	}
	// );
};

exports.updateTour = (req, res) => {
	// const tour = tours.find(tour => tour.id === req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here...>'
		}
	});
};

exports.deleteTour = (req, res) => {
	// const tour = tours.find(tour => tour.id === req.params.id);

	res.status(204).json({
		status: 'success',
		data: null
	});
};
