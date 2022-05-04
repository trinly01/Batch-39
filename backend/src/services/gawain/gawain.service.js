// Initializes the `gawain` service on path `/gawain`
const { Gawain } = require('./gawain.class');
const createModel = require('../../models/gawain.model');
const hooks = require('./gawain.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gawain', new Gawain(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gawain');

  service.hooks(hooks);
};
