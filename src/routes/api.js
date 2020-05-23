const express = require('express');
const {
    validateReqParams,
    handleController,
} = require('../middleware');
const webhookController = require('../controllers/webhookController');
const validation = require('./validation');

const router = express.Router();

/**
 * @swagger
 *
 * definitions:
 *   webhookParams:
 *     type: object
 *     required:
 *       - payload_url
 *       - content_type
 *     properties:
 *       payload_url:
 *         type: string
 *         description: url for the webhook
 *       description:
 *         type: string
 *       content-type:
 *         type:string
 *   webhookModel:
 *      allOf:     # Combines the BasicErrorModel and the inline model
 *        - $ref: '#/definitions/webhookParams'
 *        - type: object
 *          required:
 *            - uuid
 *          properties:
 *            uuid:
 *              type: string
 *              description: unique id for the webhook
*/

/**
 * @swagger
 *
 * /webhook:
 *   post:
 *     description: create new webhook
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/webhookParams'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           webhook:
 *              $ref: '#/definitions/webhookModel'
 *           ok:
 *              type:boolean
 *           error:
 *              type:boolean
*/

router.post(
    '/webhook',
    validateReqParams(validation.webhookPost),
    handleController(webhookController.post),
);

/**
 * @swagger
 *
 * /webhook/{uuid}:
 *   get:
 *     description: get specific webhook
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: path
 *          name: uuid
 *          schema:
 *            type: string
 *            description: unique id identifier for webhook
 *          required: true
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           webhook:
 *              $ref: '#/definitions/webhookModel'
 *           ok:
 *              type:boolean
 *           error:
 *              type:boolean
*/

router.get(
    '/webhook/:uuid',
    // validateReqParams(validation.webhookPost),
    handleController(webhookController.getByUUID),
);

/**
 * @swagger
 *
 * /webhook:
 *   get:
 *     description: list all webhooks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           records:
 *              type: array
 *              items:
 *                schema:
 *                  $ref: '#/definitions/webhookModel'
 *           ok:
 *              type:boolean
 *           error:
 *              type:boolean
*/
router.get(
    '/webhook/',
    // validateReqParams(validation.webhookPost),
    handleController(webhookController.listAll),
);


/**
 * @swagger
 *
 * /webhook/{uuid}:
 *   put:
 *     description: update specific webhooks
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *            type: string
 *            description: unique id identifier for webhook
 *         required: true
 *       - in: body
 *         $ref: '#/definitions/webhookParams'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           records:
 *              type: array
 *              items:
 *                schema:
 *                  $ref: '#/definitions/webhookModel'
 *           ok:
 *              type:boolean
 *           error:
 *              type:boolean
*/
router.put(
    '/webhook/:uuid',
    // validateReqParams(validation.webhookPost),
    handleController(webhookController.updateRecord),
);

/**
 * @swagger
 *
 * /webhook/{uuid}:
 *   delete:
 *     description: delete specific webhook
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: path
 *          name: uuid
 *          schema:
 *            type: string
 *            description: unique id identifier for webhook
 *          required: true
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           webhook:
 *              $ref: '#/definitions/webhookModel'
 *           ok:
 *              type:boolean
 *           error:
 *              type:boolean
*/

router.delete(
    '/webhook/:uuid',
    // validateReqParams(validation.webhookPost),
    handleController(webhookController.deleteRecord),
);

/**
 * @swagger
 *
 * /webhook/{uuid}:
 *   post:
 *     description: trigger specific webhook
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: path
 *          name: uuid
 *          schema:
 *            type: string
 *            description: unique id identifier for webhook
 *          required: true
 *        - in: body
 *          schema:
 *            type: object
 *            description: all parameters will be forward in webhook trigger call
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           webhook:
 *              $ref: '#/definitions/webhookModel'
 *           ok:
 *              type:boolean
 *           error:
 *              type:boolean
*/

router.post(
    '/webhook/:uuid',
    // validateReqParams(validation.webhookPost),
    handleController(webhookController.triggerWebhook),
);

exports.router = router;
