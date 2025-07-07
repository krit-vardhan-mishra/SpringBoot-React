import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import planeImage from '../assets/images/plane-background.jpg';
import logoHeaderImage from '../assets/images/logo-header.png';
import logoFooterImage from '../assets/images/logo-footer.png';
import { usePageTitle } from '../hooks/usePageTitle';

const RegisterPage = () => {
  usePageTitle("Register Patient");
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'none',
    problem: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlMessage = queryParams.get('message');
    if (urlMessage) {
      setMessage(urlMessage);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message || (res.ok ? 'Registration successful!' : 'Registration failed.'));
      if (res.ok) {
        setFormData({ name: '', age: '', gender: 'none', problem: '' });
      }
    } catch (err) {
      console.error(err);
      setMessage('An unexpected error occurred.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', age: '', gender: 'none', problem: '' });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pt-16 relative" style={{ backgroundImage: `url(${planeImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/60 to-purple-600/60 backdrop-blur-md z-0" />

      {/* Animated Logos */}
      <motion.div
        className="relative z-10 text-center mt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={logoHeaderImage} alt="Header Logo" className="w-36 mx-auto mb-2" />
        <img src={logoFooterImage} alt="Footer Logo" className="w-64 mx-auto" />
      </motion.div>

      {/* Form Card */}
      <motion.div
        className="text-center max-w-xl mx-auto mt-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 backdrop-blur-lg z-10 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-semibold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Register Patient
        </motion.h2>

        {message && <div className="hidden">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Your Age"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="none" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Problem Description</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              placeholder="Describe the problem..."
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </motion.div>

          <motion.div
            className="flex justify-center gap-6 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-full transition duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-full transition duration-300"
            >
              Reset
            </button>
          </motion.div>
        </form>

        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <Link to="/" className="text-blue-700 hover:underline font-medium">
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;