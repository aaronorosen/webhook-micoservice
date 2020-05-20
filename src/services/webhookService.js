const { newErrors } = require('../errors');
const webhookLoDB = require('../dataSource/webhookLoDB');
const webhookTrigger = require('../dataSource/webhookTrigger');

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
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.getRecordByUUID');
        throw err;
    }
}

async function getAllRecords(state) {
    try {
        const records = await webhookLoDB.getAllRecords(state);
        return records;
    } catch (err) {
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.getAllRecords');
        throw err;
    }
}

async function updateRecord(uuid, webhook, state) {
    try {
        const record = await webhookLoDB.updateRecord(uuid, webhook, state);

        if (!record) {
            state.logger.error({ webhookServiceError: `404 Record not found: ${uuid}` });
            throw newErrors.notfound(`uuid:${uuid} not found`);
        }
        return record;
    } catch (err) {
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.updateRecord');
        throw err;
    }
}


async function deleteRecord(uuid, state) {
    try {
        const record = await webhookLoDB.deleteRecord(uuid, state);

        if (!record) {
            state.logger.error({ webhookServiceError: `404 Record not found: ${uuid}` });
            throw newErrors.notfound(`uuid:${uuid} not found`);
        }
        return record;
    } catch (err) {
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.deleteRecord');
        throw err;
    }
}

async function triggerWebhook(uuid, body, state) {
    try {
        const record = await webhookLoDB.getRecordByUUID(uuid, state);
        if (!record) {
            state.logger.error({ webhookServiceError: `404 Record not found: ${uuid}` });
            throw newErrors.notfound(`uuid:${uuid} not found`);
        }

        const response = await webhookTrigger.post(record, body, state);
        return { response, record };
    } catch (err) {
        state.logger.error({ webhookServiceError: err }, 'Error on webhookService.getRecordByUUID');
        throw err;
    }
}

module.exports = {
    createRecord,
    getRecordByUUID,
    getAllRecords,
    updateRecord,
    deleteRecord,
    triggerWebhook,
};
