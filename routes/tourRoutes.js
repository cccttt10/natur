const express = require('express');

const tourController = require('../controllers/tourController');

const {
	aliasTopTours,
	getAllTours,
	createTour,
	getTour,
	updateTour,
	deleteTour,
	getTourStats,
	getMonthlyPlan
} = {
	...tourController
};

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(createTour);
router
	.route('/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

module.exports = router;
