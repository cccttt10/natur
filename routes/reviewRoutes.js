const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// POST /tours/1234/reviews
// GET  /tours/1234/reviews
// POST /reviews

router
	.route('/')
	.get(reviewController.getAllReviews)
	.post(
		authController.protect,
		authController.restrictTo('user'),
		reviewController.createReview
	);

router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;
