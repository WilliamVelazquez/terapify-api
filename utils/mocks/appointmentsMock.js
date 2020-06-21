const appointmentsMock = [
  {
    psy: 1,
    user: 1,
    service: 'Cita individual', // Servicio // ['Cita individual', 'Cita de pareja', 'Cita individual doble', 'Cita de pareja doble']
    start_time: '2020-06-22T14:30:00.000Z', // Inicio de cita
    end_time: '2020-06-22T15:20:00.000Z', // Fin de cita
    duration: 50, // Duración de la cita
    cost: 10, // Precio real
    totalPayed: 20, // Cantidad que el usuario pago.
    currency: 'USD',
    payed: true,
    status: 'Activa', // ['Activa', 'Cancelada', 'Pendiente', 'Reagenda']
  },
  {
    psy: 1,
    user: 2,
    service: 'Cita de pareja',
    start_time: '2020-06-24T14:30:00.000Z',
    end_time: '2020-06-24T15:20:00.000Z',
    duration: 50,
    cost: 20,
    totalPayed: 40,
    currency: 'USD',
    payed: true,
    status: 'Activa',
  },
  {
    psy: 1,
    user: 3,
    service: 'Cita individual doble',
    start_time: '2020-07-23T12:00:00.000Z',
    end_time: '2020-07-23T12:50:00.000Z',
    duration: 50,
    cost: 20,
    totalPayed: 30,
    currency: 'USD',
    payed: true,
    status: 'Pendiente',
  },
];

function filteredAppointmentsMock(status) {
  return appointmentsMock.filter(appointment => appointment.status === status);
}

class AppointmentsServiceMock {
  async getAppointments() {
    return Promise.resolve(appointmentsMock);
  }

  async createAppointment() {
    return Promise.resolve(appointmentsMock[0]);
  }
}

module.exports = {
  appointmentsMock,
  filteredAppointmentsMock,
  AppointmentsServiceMock
};
