const Tour = require('../models/tourModel');

// const tours = JSON.parse(
// 	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.aliasTopTours = (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingsAverage,price';
	req.query.fields =
		'name,price,ratingsAverage, summary, difficulty';
	next();
};

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
		}
		else query = query.sort('-createdAt');

		// 3) Field limiting
		if (req.query.fields) {
			const fields = req.query.fields.split(',').join(' ');
			query = query.select(fields);
		}
		else query = query.select('-__v');

		// 4) Pagination
		// e.g. page=2&limit=10
		const page = req.query.page * 1 || 1; // convert string to number
		const limit = req.query.limit * 1 || 100;
		const skip = (page - 1) * limit;
		query = query.skip(skip).limit(limit);
		if (req.query.page) {
			const numTours = await Tour.countDocuments();
			if (skip >= numTours)
				throw new Error('This page does not exists');
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
