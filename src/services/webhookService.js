// const errors = require('../errors');
const webhookLoDB = require('../dataSource/webhookLoDB');

async function createRecord(webhook, state) {
    try {
        const record = await webhookLoDB.create(webhook, state);
        return record;
    } catch (err) {
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.create');
        throw err;
    }
}

module.exports = {
    createRecord,
};
