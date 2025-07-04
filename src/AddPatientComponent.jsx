import React, { useState } from 'react';
import { createPatients } from './CommonUrl';
import { useNavigate } from 'react-router-dom';

const AddPatientComponent = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!patient.firstName.trim()) tempErrors.firstName = "First Name is required";
    if (!patient.lastName.trim()) tempErrors.lastName = "Last Name is required";
    if (!patient.phone.trim()) tempErrors.phone = "Phone is required";
    if (!patient.address.trim()) tempErrors.address = "Address is required";
    if (!patient.gender.trim()) tempErrors.gender = "Gender is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createPatients(patient)
        .then(() => navigate('/patient'))
        .catch(err => {
          console.error("Failed to add patient", err);
          setErrors({ submit: "Failed to add patient. Please try again." });
        });
    }
  };

  return (
    <div className="container">
      <h2>Add Patient</h2>
      {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={patient.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={patient.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={patient.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={patient.address}
            onChange={handleChange}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select
            name="gender"
            value={patient.gender}
            onChange={handleChange}
            className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        <button type="submit" className="btn btn-success">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatientComponent;
