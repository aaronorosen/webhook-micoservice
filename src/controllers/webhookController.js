const service = require('../services/webhookService');
/**
 * @param {Req} req
 * @returns {Promise<{General}>}
 */
async function post(req) {

    const webhook = await service.createRecord({
        payload_url: req.body.payload_url,
        content_type: req.body.content_type || 'application/json',
    }, req.state);

    return {
        webhook,
        status: 'ok',
        error: false,
    };
}

async function getByUUID(req) {

    console.log(req.params.uuid)
    const webhook = await service.getRecordByUUID(req.params.uuid, req.state);

    return {
        webhook,
        status: 'ok',
        error: false,
    };
}

module.exports = {
    post,
    getByUUID,
};
