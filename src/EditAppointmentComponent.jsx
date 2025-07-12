// EditAppointmentComponent.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from './api';

const EditAppointmentComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        appointmentTime: '',
        doctorId: '',
        patientId: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/Aapi/${id}`)
            .then((res) => setAppointment(res.data))
            .catch(() => setError('Failed to fetch appointment details'));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/Aapi/${id}`, appointment)
            .then(() => navigate('/appointments'))
            .catch(() => setError('Failed to update appointment'));
    };

    return (
        <div className="container">
            <h2>Edit Appointment</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Appointment Time</label>
                    <input type="datetime-local" name="appointmentTime" value={appointment.appointmentTime} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Doctor ID</label>
                    <input type="number" name="doctorId" value={appointment.doctorId} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Patient ID</label>
                    <input type="number" name="patientId" value={appointment.patientId} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditAppointmentComponent;
