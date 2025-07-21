import React, { useState } from 'react';
import { patientAPI, apiHelpers } from '../api/axios-setup';
import { AxiosError } from 'axios';

const PatientForm = () => {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', problem: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await patientAPI.registerPatient(formData);
      console.log('Saved:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error saving patient:', apiHelpers.handleError(axiosError));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="age" type="number" onChange={handleChange} placeholder="Age" />
      <input name="gender" onChange={handleChange} placeholder="Gender" />
      <textarea name="problem" onChange={handleChange} placeholder="Describe problem" />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;