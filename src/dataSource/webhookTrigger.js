const axios = require('axios').default;

const triggerClient = axios.create({
    timeout: 1000,
});

async function post(record, body, state) {
    const options = {
        method: 'POST',
        headers: { 'content-type': record.content_type },
        data: body,
        url: record.payload_url,
    };

    const response = await triggerClient(options);
    state.logger.info({ webhookTrigger: { Trigger: record.payload_url, body, response: response.data } }, 'Trigger webhook');

    return response.data;
}

module.exports = {
    post,
};
