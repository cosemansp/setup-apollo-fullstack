require('expect-more-jest');
require('./supertest.matcher');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const IntlPolyfill = require('intl'); // tslint:disable-line

// Jest and node only support English locale
// Therefore we add the polyfill for unit testing
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

process.env.DEBUG_TEST_SUB = '804d22ee-f292-4af9-9277-20833b8af0a0';
process.env.LOG_LEVEL = 'error';
process.env.BLOCKCHAIN_SIMULATE = 'true';
process.env.BLOCKCHAIN_SIGNER_PRIVATE_KEY = '1234';
process.env.BLOCKCHAIN_SIGNER_CHAIN_ID = '11111';
process.env.BLOCKCHAIN_PUBLISHER_CHAIN_ID = '99999999';
