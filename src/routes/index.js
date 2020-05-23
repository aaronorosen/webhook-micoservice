// Config available in
// const config = require('../config/index');
const express = require('express');
const api = require('./api');
const middleware = require('../middleware');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Webhook Crud', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['./src/routes/api.js'],
});

const router = express.Router();

// region internal
// endregion

// region custom routes
router.use('/api/', api.router);
// endregion

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use(middleware.errorHandler);
router.use(middleware.standardHandler);

module.exports = router;
