const joi = require('joi');

const webhookPost = joi.object().keys({
    body: joi.object().keys({
        payload_url: joi.string().required(),
        content_type: joi.string().required(),
        description: joi.string(),
    }).required(),
});

module.exports = {
    webhookPost,
};
