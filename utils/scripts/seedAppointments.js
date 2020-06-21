const chalk = require('chalk');
const debug = require('debug')('app:scripts:appointments');
const MongoLib = require('../../lib/mongo');
const { appointmentsMock } = require('../../utils/mocks/appointmentsMock');

async function seedAppointments() {
  try {
    const mongoDB = new MongoLib();

    const promises = appointmentsMock.map(async appointment => {
      await mongoDB.create('appointments', appointment);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} appointments have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedAppointments();
