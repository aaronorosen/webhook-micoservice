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

module.exports = {
    create,
};

