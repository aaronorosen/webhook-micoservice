const express = require('express');
const {
    validateReqParams,
    handleController,
} = require('../middleware');
const webhookController = require('../controllers/webhookController');
const validation = require('./validation');

const router = express.Router();
router.post(
    '/webhook',
    validateReqParams(validation.webhookPost),
    handleController(webhookController.post),
);

router.get(
    '/webhook/:uuid',
    // validateReqParams(validation.webhookPost),
    handleController(webhookController.getByUUID),
);

exports.router = router;
