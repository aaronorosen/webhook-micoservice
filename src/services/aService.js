const errors = require('../errors');

async function service(state) {
    try {
        state.logger.info({ aServiceCall: 'Log infor regarding the call into bunyan using state object' });
        return {
            'available errors list': errors,
        };
    } catch (err) {
        state.logger.error({ aServiceError: err }, 'Log error into bunyan using state object');
        throw err;
    }
}

module.exports = {
    service,
};
