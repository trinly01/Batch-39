const assert = require('assert');
const app = require('../../src/app');

describe('\'gawain\' service', () => {
  it('registered the service', () => {
    const service = app.service('gawain');

    assert.ok(service, 'Registered the service');
  });
});
