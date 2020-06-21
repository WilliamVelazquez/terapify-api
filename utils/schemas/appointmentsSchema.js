const joi = require('@hapi/joi');

// const psychologistIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
// const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const appointmentIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const psychologistIdSchema = joi.number().min(1);
const userIdSchema = joi.number().min(1);
const serviceSchema = joi.string().valid('Cita individual', 'Cita de pareja', 'Cita individual doble', 'Cita de pareja doble');
const startTimeSchema = joi.date().iso();
const endTimeSchema = joi.date().iso();
const durationSchema = joi
  .number()
  .min(1)
  .max(240);
const costSchema = joi
  .number()
  .min(1)
  .max(300);
const totalPayedSchema = joi
  .number()
  .min(1)
  .max(300);
const currencySchema = joi.string().max(5);
const payedSchema = joi.boolean();
const statusSchema = joi.string().valid('Activa', 'Cancelada', 'Pendiente', 'Reagenda');

const idSchema = {
  appointmentId: appointmentIdSchema.required(),
};

const createAppointmentSchema = {
  psy: psychologistIdSchema.required(),
  user: userIdSchema.required(),
  service: serviceSchema,
  start_time: startTimeSchema.required(),
  end_time: endTimeSchema.required(),
  duration: durationSchema.required(),
  cost: costSchema.required(),
  totalPayed: totalPayedSchema.required(),
  currency: currencySchema.required(),
  payed: payedSchema.required(),
  status: statusSchema.required(),
};

const updateAppointmentSchema = {
  service: serviceSchema,
  start_time: startTimeSchema,
  end_time: endTimeSchema,
  duration: durationSchema,
  cost: costSchema,
  totalPayed: totalPayedSchema,
  currency: currencySchema,
  payed: payedSchema,
  status: statusSchema,
};

module.exports = {
  idSchema,
  createAppointmentSchema,
  updateAppointmentSchema
};
