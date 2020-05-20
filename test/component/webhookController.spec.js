const chai = require('chai');

const initSetup = require('../lib/utils/initSetup');
const testUtil = require('../lib/utils/testUtil');

/*const {
    OpReturn,
    Block,
    Transaction,
} = require('../../src/repositories/db_models'); */ 
const config = require('../../src/config');

const { expect } = chai;
const { urls } = testUtil;

describe('Testing webhookController full flow', () => {
    let out;
    
    before(async () => {
        out = await initSetup.prepare();
    });

    beforeEach(async () => {
    });

    describe('webhookController api test', () => {

        it('POST webhook/ endpoint 400 error', async () => {
            const { body } = await out.users.anonymous
                .make('post', urls.api.webhook())
                .send({
                    // payload_url: 'google.com',
                    content_type: 'application/json',
                })
                .expect(400);
            console.log(body);


            expect(body['odata.error'].code).to.be.eql(10166);
            expect(body['odata.error'].message.lang).to.be.eql('en-US');
            expect(body['odata.error'].message.value).to.be
                .eql('child "body" fails because [child "payload_url" fails because ["payload_url" is required]]');
        });
        
        it('POST webhook/ endpoint succesfull call', async () => {
            const { body } = await out.users.anonymous
                .make('post', urls.api.webhook())
                .send({
                    payload_url: 'google.com',
                    content_type: 'application/json',
                })
                .expect(200);
            console.log(body);
            expect(body.webhook.payload_url).to.be.eql('google.com');
            expect(body.webhook.content_type).to.be.eql('application/json');
            expect(body.status).to.be.eql('ok');
            expect(body.error).to.be.eql(false);
        });

        /* it('aRoute/ endpoint failed call due to validation', async () => {
            const { body } = await out.users.anonymous
                .make('post', urls.api.base())
                .send({
                    // requiredTestField: 'hello',
                    notRequiredField: 'bye',
                })
                .expect(400);
            
            expect(body['odata.error'].message.value).to.be.eql('child "body" fails because [child "requiredTestField" fails because ["requiredTestField" is required]]');
        }); */

    });
});
