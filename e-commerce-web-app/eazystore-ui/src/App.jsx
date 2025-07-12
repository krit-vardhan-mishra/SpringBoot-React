import React from 'react';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


export default App;
