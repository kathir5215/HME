import React, { useState, useEffect } from 'react';
import { createAppointments, listDoctors, listPatients } from './Common Url';
import { useNavigate } from 'react-router-dom';

const AddAppointmentComponent = () => {
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    appointmentTime: '',
    doctorId: '',
    patientId: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    listDoctors()
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors", error));

    listPatients()
      .then(response => setPatients(response.data))
      .catch(error => console.error("Error fetching patients", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!appointment.appointmentTime.trim()) tempErrors.appointmentTime = "Appointment time is required";
    if (!appointment.doctorId) tempErrors.doctorId = "Doctor is required";
    if (!appointment.patientId) tempErrors.patientId = "Patient is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const saveAppointment = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        appointmentTime: appointment.appointmentTime,
        doctorId: Number(appointment.doctorId),
        patientId: Number(appointment.patientId)
      };
      

      createAppointments(payload)
        .then(() => {
          navigate('/appointments');
        })
        .catch(error => {
          console.error('Error saving appointment', error);
        });
    }
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Add Appointment</h2>
          <div className='card-body'>
            <form onSubmit={saveAppointment}>
              <div className='form-group'>
                <label className='form-label'>Appointment Time:</label>
                <input
                  type='datetime-local'
                  name='appointmentTime'
                  value={appointment.appointmentTime}
                  onChange={handleInputChange}
                  className={`form-control ${errors.appointmentTime ? 'is-invalid' : ''}`}
                />
                {errors.appointmentTime && <div className='text-danger'>{errors.appointmentTime}</div>}

                <label className='form-label mt-3'>Doctor:</label>
                <select
                  name='doctorId'
                  value={appointment.doctorId}
                  onChange={handleInputChange}
                  className={`form-control ${errors.doctorId ? 'is-invalid' : ''}`}
                >
                  <option value=''>Select Doctor</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name}</option>
                  ))}
                </select>
                {errors.doctorId && <div className='text-danger'>{errors.doctorId}</div>}

                <label className='form-label mt-3'>Patient:</label>
                <select
                  name='patientId'
                  value={appointment.patientId}
                  onChange={handleInputChange}
                  className={`form-control ${errors.patientId ? 'is-invalid' : ''}`}
                >
                  <option value=''>Select Patient</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                  ))}
                </select>
                {errors.patientId && <div className='text-danger'>{errors.patientId}</div>}
              </div>

              <button type='submit' className='btn btn-success mt-3'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentComponent;
