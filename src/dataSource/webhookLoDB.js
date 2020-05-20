const lodb = require('lodb');
const uuidv4 = require('uuid/v4');

const db = lodb('db.json');

async function create(webhook, state) {
    webhook.uuid = uuidv4();
    db('webhook').push(webhook);
    state.logger.info({ webhookLoDB: { create: webhook } }, 'Creating webhook');
    await db.save();
    return webhook;
}

async function getRecordByUUID(uuid, state) {
    const record = await db('webhook').find({ uuid }).value();
    state.logger.info({ webhookLoDB: { getRecordByUUID: record } }, 'Getting webhook');
    return record;
}

async function getAllRecords(state) {
    const records = await db('webhook').value();
    state.logger.info({ webhookLoDB: { getAllRecords: records } }, 'listing all webhooks');
    return records;
}

module.exports = {
    create,
    getRecordByUUID,
    getAllRecords,
};
