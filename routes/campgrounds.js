const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgroundCtrl = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgroundCtrl.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundCtrl.createCampground));

router.get('/new', isLoggedIn, campgroundCtrl.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundCtrl.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundCtrl.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundCtrl.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundCtrl.renderEditForm));

module.exports = router;