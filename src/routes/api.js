const express = require('express');
const {
    validateReqParams,
    handleController,
} = require('../middleware');
const aController = require('../controllers/aController');
const validation = require('./validation');

const router = express.Router();
router.post(
    '/aRoute',
    validateReqParams(validation.aRoute),
    handleController(aController.getData),
);

exports.router = router;
