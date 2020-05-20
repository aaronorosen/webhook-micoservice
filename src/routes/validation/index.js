const joi = require('joi');

const aRoute = joi.object().keys({
    body: joi.object().keys({
        requiredTestField: joi.string().required(),
    }).required(),
});

module.exports = {
    aRoute,
};
