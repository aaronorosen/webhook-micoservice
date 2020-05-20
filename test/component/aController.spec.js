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

describe('Testing aController full flow', () => {
    let out;
    
    before(async () => {
        out = await initSetup.prepare();
    });

    beforeEach(async () => {
    });

    describe('aController api test', () => {

        it('aRoute/ endpoint succesfull call', async () => {
            const { body } = await out.users.anonymous
                .make('post', urls.api.base())
                .send({
                    requiredTestField: 'hello',
                })
                .expect(200);

            expect(body.mirrorBody.requiredTestField).to.be.eql('hello');
        });

        it('aRoute/ endpoint failed call due to validation', async () => {
            const { body } = await out.users.anonymous
                .make('post', urls.api.base())
                .send({
                    // requiredTestField: 'hello',
                    notRequiredField: 'bye',
                })
                .expect(400);
            
            expect(body['odata.error'].message.value).to.be.eql('child "body" fails because [child "requiredTestField" fails because ["requiredTestField" is required]]');
        });

    });
});
