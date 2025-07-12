import api from './api';


export const listPatients = () => api.get('/Papi/patient');
export const createPatients = (patient) => api.post('/Papi/patient', patient);

export const listDoctors = () => api.get('/Dapi/doctor');
export const createDoctors = (doctor) => api.post('/Dapi/doctor', doctor);

export const listappointments = () => api.get('/Aapi/appointments');
export const createAppointments = (appointment) => api.post('/Aapi/appointments', appointment);

export const deletePatient = (id) => api.delete(`/Papi/${id}`);
export const deleteDoctor = (id) => api.delete(`/Dapi/${id}`);
export const deleteAppointment = (id) => api.delete(`/Aapi/${id}`);

