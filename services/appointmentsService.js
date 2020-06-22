const MongoLib = require('../lib/mongo');
const { getInitialCurrentDate, getlastDateAfterDays } = require('../utils/utilities');
// const { appointmentsMock, filteredAppointmentsMock, AppointmentsServiceMock } = require('../utils/mocks/appointmentsMock');

class AppointmentsService {
	constructor (){
    this.collection = 'appointments';
    this.mongoDB = new MongoLib();
	}

	async getAppointments(start_time = '', end_time = '', status = '') {
		// const appointments = await Promise.resolve(appointmentsMock);
		//2020-06-22T14:30:00.000Z
		const start = start_time || getInitialCurrentDate();
		const end = end_time || getlastDateAfterDays();

		const query = (start && end) && { start_time: { $gt: new Date(start) }, end_time: { $lt: new Date(end) } };
		if(status) query.status=status;
		
    const appointments = await this.mongoDB.getAll(this.collection, query);
		return appointments || [];
	}
	
	async getAppointmentsByPsychologist(psychologistId, start_time = '', end_time = '', status = '') {
		// const appointments = await Promise.resolve(appointmentsMock);
		const start = start_time || getInitialCurrentDate();
		const end = end_time || getlastDateAfterDays();

		const query = (start && end) && { start_time: { $gt: new Date(start) }, end_time: { $lt: new Date(end) } };
		if(status) query.status=status;
		if (psychologistId) query.psy = psychologistId;
		
    const appointments = await this.mongoDB.getAll(this.collection, query);
		return appointments || [];
	}

	async getAppointment(appointmentId) {
		// const appointment = await Promise.resolve(AppointmentsServiceMock.createAppointment());
		const appointment = await this.mongoDB.get(this.collection, appointmentId);
		return appointment || {};
	}

	async createAppointment(appointment) {
		// const createdAppointmentId = await Promise.resolve(AppointmentsServiceMock.createAppointment);
		const createdAppointmentId = await this.mongoDB.create(this.collection, appointment);
		return createdAppointmentId;
	}

	async updateAppointment({ appointmentId, appointment } = {}) {
    const updatedAppointmentId = await this.mongoDB.update(
      this.collection,
      appointmentId,
      appointment
    );
    return updatedAppointmentId;
	}
	
	async deleteAppointment(appointmentId) {
    const deletedAppointmentId = await this.mongoDB.delete(this.collection, appointmentId);
    return deletedAppointmentId;
	}
}

module.exports = AppointmentsService;
