import React, { useState, useEffect } from 'react';
import { createAppointment, listDoctors, listPatients } from './CommonUrl';
import { useNavigate } from 'react-router-dom';

const AddAppointmentComponent = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    appointmentTime: '',
    doctorId: '',
    patientId: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});
  const [availabilityError, setAvailabilityError] = useState('');

  useEffect(() => {
    listDoctors()
      .then(res => { 
          setDoctors(res.data.filter(doc => doc.available === 'Yes'))
      })
      .catch(() => setDoctors([]));

    listPatients()
      .then(res => setPatients(res.data))
      .catch(() => setPatients([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({ ...prev, [name]: value }));
    setAvailabilityError('');
  };

  const validate = () => {
    let tempErrors = {};
    if (!appointment.appointmentTime.trim()) tempErrors.appointmentTime = "Appointment time is required";
    if (!appointment.doctorId) tempErrors.doctorId = "Doctor must be selected";
    if (!appointment.patientId) tempErrors.patientId = "Patient must be selected";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedDoctor = doctors.find(doc => doc.id == appointment.doctorId);
    if (!selectedDoctor || selectedDoctor.available !== 'Yes') {
      setAvailabilityError('Selected doctor is not available');
      return;
    }

    createAppointment(appointment)
      .then(() => navigate('/appointments'))
      .catch(err => {
        console.error("Failed to create appointment", err);
        if (err.response?.data?.includes("not available")) {
          setAvailabilityError(err.response.data);
        } else {
          setErrors({ submit: "Failed to create appointment. Try again." });
        }
      });
  };

  return (
    <div className="container">
      <h2>Add Appointment</h2>
      {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
      {availabilityError && <div className="alert alert-warning">{availabilityError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Appointment Time</label>
          <input
            type="datetime-local"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
            className={`form-control ${errors.appointmentTime ? 'is-invalid' : ''}`}
          />
          {errors.appointmentTime && <div className="invalid-feedback">{errors.appointmentTime}</div>}
        </div>
        <div className="mb-3">
          <label>Doctor</label>
          <select
            name="doctorId"
            value={appointment.doctorId}
            onChange={handleChange}
            className={`form-select ${errors.doctorId ? 'is-invalid' : ''}`}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter(doctor => doctor.available === 'Yes')
              .map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} (Available)
                </option>
              ))}
            {doctors
              .filter(doctor => doctor.available !== 'Yes')
              .map(doc => (
                <option key={doc.id} value={doc.id} disabled>
                  {doc.name} (Not Available)
                </option>
              ))}
          </select>
          {errors.doctorId && <div className="invalid-feedback">{errors.doctorId}</div>}
          </div>
          <div className="mb-3">
          <label>Patient</label>
          <select
            name="patientId"
            value={appointment.patientId}
            onChange={handleChange}
            className={`form-select ${errors.patientId ? 'is-invalid' : ''}`}
          >
            <option value="">Select Patient</option>
            {patients.map(pat => (
              <option key={pat.id} value={pat.id}>{pat.firstName} {pat.lastName}</option>
            ))}
          </select>
          {errors.patientId && <div className="invalid-feedback">{errors.patientId}</div>}
        </div>
        <button type="submit" className="btn btn-success">Add Appointment</button>
      </form>
    </div>
  );
};

export default AddAppointmentComponent;
