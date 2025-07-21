import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import RegisterPage from './pages/register-page';
import DetailsPage from './pages/details-page';
import AdminLoginPage from './pages/admin-login-page';
import LoadingScreen from './components/loading-screen';
import { LoadingProvider, useLoading } from './components/loading-context'; 

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Routes>
      <LoadingScreen isLoading={isLoading} />
    </div>
  );
};

function App() {
  return (
    <LoadingProvider>
      <Router>
        <AppContent />
      </Router>
    </LoadingProvider>
  );
}

export default App;