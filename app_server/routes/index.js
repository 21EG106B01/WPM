const express = require('express');
const { indexPage } = require('../controller');
const router = express.Router();
const ctrlLocations = require('../controller/locations');
const ctrlOthers = require('../controller/others');


router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

router.get('/about', ctrlOthers.about);

module.exports = router;
