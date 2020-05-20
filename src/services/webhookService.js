const { newErrors } = require('../errors');
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

async function getRecordByUUID(uuid, state) {
    try {
        const record = await webhookLoDB.getRecordByUUID(uuid, state);
        if (!record) {
            state.logger.error({ webhookServiceError: `404 Record not found: ${uuid}` });
            throw newErrors.notfound(`uuid:${uuid} not found`);
        }
        return record;
    } catch (err) {
        console.log(err);
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.create');
        throw err;
    }
}

async function getAllRecords(state) {
    try {
        const records = await webhookLoDB.getAllRecords(state);
        return records;
    } catch (err) {
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.create');
        throw err;
    }
}

module.exports = {
    createRecord,
    getRecordByUUID,
    getAllRecords,
};
