import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Patient from '../types/patient';
import planeImage from '../assets/images/plane-background.jpg';
import logoHeaderImage from '../assets/images/logo-header.png';
import logoFooterImage from '../assets/images/logo-footer.png';
import { usePageTitle } from '../hooks/usePageTitle';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, 
      ease: "easeInOut", 
    },
  },
};

const DetailsPage = () => {
  usePageTitle("Patient Details");

  const [patients, setPatients] = useState<Patient[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients');
        if (response.ok) {
          const data: Patient[] = await response.json();
          setPatients(data);
        } else {
          setMessage('Failed to load patient data');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred while fetching patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();

    const queryParams = new URLSearchParams(window.location.search);
    const urlMessage = queryParams.get('message');

    if (urlMessage) {
      setMessage(urlMessage);
    }
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pt-16 relative"
      style={{ backgroundImage: `url(${planeImage})` }}>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/60 to-purple-600/60 backdrop-blur-md z-0" />

      {/* Logos */}
      <motion.div className="relative z-10 text-center mt-8" variants={container} initial="hidden" animate="show">
        <motion.img src={logoHeaderImage} alt="Header Logo" className="w-36 mx-auto mb-2" variants={item} />
        <motion.img src={logoFooterImage} alt="Footer Logo" className="w-64 mx-auto" variants={item} />
      </motion.div>

      {/* Main Content */}
      <motion.div className="max-w-xl mx-auto mt-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 backdrop-blur-lg z-10 relative"
        variants={container} initial="hidden" animate="show">
        <motion.h2 className="text-3xl font-semibold text-gray-800 underline mb-6 text-center" variants={item}>
          Details of All Waiting Patients
        </motion.h2>

        {message && <motion.p className="text-red-500 text-center mb-4" variants={item}>{message}</motion.p>}

        {loading ? (
          <motion.p className="text-center text-gray-700" variants={item}>Loading patient data...</motion.p>
        ) : patients.length > 0 ? (
          <motion.div className="overflow-x-auto" variants={item}>
            <table className="w-full border-collapse shadow-md rounded-lg bg-white">
              <thead>
                <tr>
                  <th className="p-3 text-left border border-gray-300 bg-black text-white">ID</th>
                  <th className="p-3 text-left border border-gray-300 bg-black text-white">Name</th>
                  <th className="p-3 text-left border border-gray-300 bg-black text-white">Age</th>
                  <th className="p-3 text-left border border-gray-300 bg-black text-white">Gender</th>
                  <th className="p-3 text-left border border-gray-300 bg-black text-white">Problem</th>
                  <th className="p-3 text-left border border-gray-300 bg-black text-white">Arrival Time</th>
                  <th className="p-3 text-left border border-gray-300 bg-black text-white">Emergency Level</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <motion.tr key={patient.id} className="hover:bg-gray-100 transition duration-200" variants={item}>
                    <td className="p-3 text-left border border-gray-300">{patient.id}</td>
                    <td className="p-3 text-left border border-gray-300">{patient.name}</td>
                    <td className="p-3 text-left border border-gray-300">{patient.age}</td>
                    <td className="p-3 text-left border border-gray-300">{patient.gender}</td>
                    <td className="p-3 text-left border border-gray-300">{patient.problem}</td>
                    <td className="p-3 text-left border border-gray-300">{formatDate(patient.arrivalTime)}</td>
                    <td className="p-3 text-left border border-gray-300">{patient.emergencyLevel}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.p className="text-center" variants={item}>No patients found.</motion.p>
        )}

        <motion.div className="flex flex-col items-center mt-6 gap-2" variants={item}>
          <p className="text-blue-700 font-medium">
            <Link
              to="/admin-login"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Only accessible by admins
            </Link>
          </p>
          <Link
            to="/"
            className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-full transition duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DetailsPage;