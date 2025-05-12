import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', problem: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/patients', formData);
      console.log('Saved:', response.data);
    } catch (error) {
      console.error('Error saving patient:', error);
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