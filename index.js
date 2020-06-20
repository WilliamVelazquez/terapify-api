const express = require('express');
const app = express();

const { config } = require('./config');

app.listen(config.port, function(){
  if(config.dev) console.log('Development environment');
  console.log(`Listening http://localhost:${config.port}`);
});
