const lodb = require('lodb');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');

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

async function updateRecord(uuid, webhook, state) {
    const originalRecord = await db('webhook').find({ uuid }).value();

    if (!originalRecord) return null;
    const record = _.merge({}, originalRecord, webhook);

    await db('webhook').remove({ uuid });
    db('webhook').push(record);
    await db.save();

    state.logger.info({ webhookLoDB: { updateRecord: record } }, 'Updating webhook');
    return record;
}

async function deleteRecord(uuid, state) {
    const originalRecord = await db('webhook').find({ uuid }).value();

    if (!originalRecord) return null;

    await db('webhook').remove({ uuid });
    await db.save();
    state.logger.info({ webhookLoDB: { deleteRecord: originalRecord } }, 'Deleting webhook');

    return originalRecord;
}

module.exports = {
    create,
    getRecordByUUID,
    getAllRecords,
    updateRecord,
    deleteRecord,
};
