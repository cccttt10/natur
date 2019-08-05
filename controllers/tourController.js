const Tour = require('../models/tourModel');

// const tours = JSON.parse(
// 	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = async (req, res) => {
	try {
		// BUILD QUERY
		// 1A) Filtering
		const queryObj = { ...req.query };
		const excludedFields = [ 'page', 'sort', 'limit', 'fields' ];
		excludedFields.forEach(field => delete queryObj[field]);

		// 1B) Advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt)\b/g,
			match => `$${match}`
		);

		console.log(JSON.parse(queryStr));

		let query = Tour.find(JSON.parse(queryStr));

		// 2) Sorting
		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ');
			console.log(sortBy);
			query = query.sort(sortBy);
		} else {
			query = query.sort('-createdAt');
		}

		// EXECUTE QUERY
		const tours = await query;

		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: { tours }
		});
	} catch (err) {
		res.status(404).json({ status: 'fail', message: err });
	}
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data: { tour }
		});
	} catch (err) {
		res.status(404).json({ status: 'fail', message: err });
	}
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
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true
			}
		);
		res.status(200).json({
			status: 'success',
			data: {
				tour
			}
		});
	} catch (err) {
		res.status(404).json({ status: 'fail', message: err });
	}
};

exports.deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null
		});
	} catch (err) {
		res.status(404).json({ status: 'fail', message: err });
	}
};
