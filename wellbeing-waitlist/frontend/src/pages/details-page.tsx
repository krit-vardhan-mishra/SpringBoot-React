import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Patient from '../types/patient';
import planeImage from '../assets/images/plane-background.jpg';
import logoHeaderImage from '../assets/images/logo-header.png';
import logoFooterImage from '../assets/images/logo-footer.png';
import { usePageTitle } from '../hooks/usePageTitle';
import { patientAPI, apiHelpers } from '../api/axios-setup';
import { AxiosError } from 'axios';

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
  const queryParams = new URLSearchParams(window.location.search);
  const urlMessage = queryParams.get('message');
  if (urlMessage) setMessage(urlMessage);
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = isAdmin
          ? await patientAPI.getPatients(true)
          : await patientAPI.getPatients(false);
        setPatients(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setMessage(apiHelpers.handleError(axiosError));
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();

    const queryParams = new URLSearchParams(window.location.search);
    const urlMessage = queryParams.get('message');

    if (urlMessage) setMessage(urlMessage);
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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pt-20 pb-12 relative"
      style={{ backgroundImage: `url(${planeImage})` }}>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/70 to-purple-700/70 backdrop-blur-sm z-0" />

      {/* Logos */}
      <motion.div className="relative z-10 text-center mb-10" variants={container} initial="hidden" animate="show">
        <motion.img src={logoHeaderImage} alt="Header Logo" className="w-32 mx-auto mb-4" variants={item} />
        <motion.img src={logoFooterImage} alt="Footer Logo" className="w-56 mx-auto" variants={item} />
      </motion.div>

      {/* Main Content */}
      <motion.div className="max-w-6xl mx-auto bg-white/95 rounded-2xl shadow-xl p-8 z-10 relative"
        variants={container} initial="hidden" animate="show">
        <motion.h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight" variants={item}>
          Patient Waiting List
        </motion.h2>

        {message && (
          <motion.p className="text-red-600 bg-red-50 p-4 rounded-lg text-center mb-6" variants={item}>
            {message}
          </motion.p>
        )}

        {loading ? (
          <motion.p className="text-center text-gray-600 text-lg" variants={item}>
            Loading patient data...
          </motion.p>
        ) : patients.length > 0 ? (
          <motion.div className="overflow-x-auto" variants={item}>
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">ID</th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Age</th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Gender</th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Problem</th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Arrival Time</th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Emergency Level</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <motion.tr 
                    key={patient.id} 
                    className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors duration-200`} 
                    variants={item}
                  >
                    <td className="p-4 text-gray-800">{index + 1}</td>
                    <td className="p-4 text-gray-800 font-medium">{patient.name}</td>
                    <td className="p-4 text-gray-800">{patient.age}</td>
                    <td className="p-4 text-gray-800">{patient.gender}</td>
                    <td className="p-4 text-gray-800">{patient.problem}</td>
                    <td className="p-4 text-gray-800">{formatDate(patient.arrivalTime)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        patient.emergencyLevel} bg-green-100 text-green-800`}>
                        {patient.emergencyLevel}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.p className="text-center text-gray-600 text-lg" variants={item}>
            No patients found.
          </motion.p>
        )}

        <motion.div className="flex flex-col items-center mt-8 gap-4" variants={item}>
          {!isAdmin && <Link
            to="/admin-login"
            className="text-indigo-600 hover:text-indigo-800 font-medium underline transition-colors duration-200"
          >
            Admin Access Only
          </Link>}
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DetailsPage;