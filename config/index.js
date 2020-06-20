require('dotenv').config();

const config = {
  port: process.env.PORT || 3002,
  dev: process.env.NODE_ENV !== 'production',
}

module.exports = { config };
