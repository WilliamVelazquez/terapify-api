const express = require('express');
const AppointmentsService = require('../services/appointmentsService');

const { idSchema, createAppointmentSchema, updateAppointmentSchema } = require('../utils/schemas/appointmentsSchema');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/utilities');

const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');

function appointmentsApi(app) {
  const router = express.Router();
  app.use('/api/appointments', router);

  const appointmentsService = new AppointmentsService();

  router.get(
    '/',
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { start_time, end_time, status } = req.query;

      try {
        const appointments = await appointmentsService.getAppointments(start_time, end_time, status);

        res.status(200).json({
          data: appointments,
          message: 'appointments listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:appointmentId',
    validationHandler(idSchema, 'params'),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { appointmentId } = req.params;

      try {
        const appointment = await appointmentsService.getAppointment(appointmentId);

        res.status(200).json({
          data: appointment,
          message: 'appointment retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/psy/:psyId',
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { psyId } = req.params;
      const { start_time, end_time, status } = req.query;

      try {
        const appointment = await appointmentsService.getAppointmentsByPsychologist(parseInt(psyId, 10), start_time, end_time, status);

        res.status(200).json({
          data: appointment,
          message: 'appointments listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createAppointmentSchema),
    async function(req, res, next) {
      const { body } = req;

      // Converting the Date for testing with a String from Postman
      const appointment = { 
        ...body,
        start_time: new Date(body.start_time),
        end_time: new Date(body.end_time)
      }

      try {
        const createdAppointmentId = await appointmentsService.createAppointment(appointment);

        res.status(201).json({
          data: createdAppointmentId,
          message: 'appointment created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:appointmentId',
    validationHandler(idSchema, 'params'),
    validationHandler(updateAppointmentSchema),
    async function(req, res, next) {
      const { appointmentId } = req.params;
      const { body } = req;

      const appointment = { 
        ...body,
      }
      if(appointment.start_time) appointment.start_time = new Date(body.start_time)
      if(appointment.end_time) appointment.end_time = new Date(body.end_time)

      try {
        const updatedAppointmentId = await appointmentsService.updateAppointment({
          appointmentId,
          appointment
        });

        res.status(200).json({
          data: updatedAppointmentId,
          message: 'appointment updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:appointmentId',
    validationHandler(idSchema, 'params'),
    async function(req, res, next) {
      const { appointmentId } = req.params;

      try {
        const deletedAppointedId = await appointmentsService.deleteAppointment(appointmentId);

        res.status(200).json({
          data: deletedAppointedId,
          message: 'appointment deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = appointmentsApi;
