import React, { useState } from 'react';
import { createDoctors } from './CommonUrl';
import { useNavigate } from 'react-router-dom';

const AddDoctorComponent = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: '',
    phone: '',
    gender: '',
    available: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!doctor.name.trim()) tempErrors.name = "Name is required";
    if (!doctor.phone.trim()) tempErrors.phone = "Phone is required";
    if (!doctor.gender.trim()) tempErrors.gender = "Gender is required";
    if (!doctor.available.trim()) tempErrors.available = "Availability is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createDoctors(doctor)
        .then(() => navigate('/doctors'))
        .catch(err => {
          console.error("Failed to add doctor", err);
          setErrors({ submit: "Failed to add doctor. Please try again." });
        });
    }
  };

  return (
    <div className="container">
      <h2>Add Doctor</h2>
      {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={doctor.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select
            name="gender"
            value={doctor.gender}
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

        <div className="mb-3">
          <label>Available</label>
          <input
            type="text"
            name="available"
            value={doctor.available}
            onChange={handleChange}
            className={`form-control ${errors.available ? 'is-invalid' : ''}`}
          />
          {errors.available && <div className="invalid-feedback">{errors.available}</div>}
        </div>

        <button type="submit" className="btn btn-success">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctorComponent;
