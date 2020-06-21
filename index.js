const express = require('express');

const app = express();

const { config } = require('./config');

const appointmentsApi = require('./routes/appointments');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');

// Routes
appointmentsApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, function(){
  if(config.dev) console.log('Development environment');
  console.log(`Listening http://localhost:${config.port}`);
});
