const express = require('express');

const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// POST /tours/1234/reviews
// GET  /tours/1234/reviews
// GET  /tours/1234/reviews/5678

router.use('/:tourId/reviews', reviewRouter);

router
	.route('/top-5-cheap')
	.get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
	.route('/monthly-plan/:year')
	.get(tourController.getMonthlyPlan);

router
	.route('/')
	.get(tourController.getAllTours)
	.post(tourController.createTour);
router
	.route('/:id')
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(
		authController.protect,
		authController.restrictTo('admin', 'lead-guide'),
		tourController.deleteTour
	);

module.exports = router;
