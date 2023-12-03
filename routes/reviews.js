const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviewCtrl = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviewCtrl.createReview));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewCtrl.deleteReview));

module.exports = router;