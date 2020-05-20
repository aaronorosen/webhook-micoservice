const { service } = require('../services/aService');
/**
 * @param {Req} req
 * @returns {Promise<{General}>}
 */
async function getData(req) {
    const errorList = await service(req.state);
    return {
        errorList,
        mirrorBody: req.body,
    };
}

module.exports = {
    getData,
};
