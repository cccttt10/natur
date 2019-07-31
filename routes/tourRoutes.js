const express = require('express');

const tourController = require('../controllers/tourController');

const {
	checkID,
	getAllTours,
	createTour,
	getTour,
	updateTour,
	deleteTour
} = {
	...tourController
};

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);
router
	.route('/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

module.exports = router;
