import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faTags, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import DarkModeToggleButton from './ui/DarkModeToggleButton';
import { useTheme } from '../context/ThemeContext';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const { isDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/login', label: 'Login' },
    { to: '/cart', label: <FontAwesomeIcon icon={faShoppingBasket} />, isIcon: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: {
        scale: { type: "spring", stiffness: 400, damping: 17 },
        rotate: { duration: 0.4, ease: "easeInOut" }
      }
    }
  };

  const navLinkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-md bg-opacity-90 shadow-lg'
          : 'bg-opacity-100'
          } ${isDarkMode
            ? 'text-white border-gray-600'
            : 'text-black border-gray-300'
          } border-b`}
        style={{
          backgroundColor: isDarkMode ? '#19242D' : '#F0F3F2'
        }}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              variants={logoVariants}
              whileHover="hover"
            >
              <div className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-600'
                }`}>
                <FontAwesomeIcon icon={faTags} className="text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Easy Stickers
                </span>
                <span className="text-xs opacity-60">Premium Quality</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">

              {/* Theme Toggle */}
              <div className="flex items-center gap-4">
                <DarkModeToggleButton />
              </div>

              <nav className="flex items-center gap-6">
                {navItems.map((item, index) => {
                  const isHome = item.to === '/home' && (location.pathname === '/' || location.pathname === '/home');

                  return (
                    <NavLink key={item.to} to={item.to} className="relative group">
                      {({ isActive }) => {
                        const active = isHome || isActive;

                        return (
                          <motion.div
                            className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${active
                              ? isDarkMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 text-blue-600'
                              : 'hover:bg-opacity-10 hover:bg-gray-500'
                              }`}
                            variants={navLinkVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className={`text-sm font-medium ${item.isIcon ? 'text-lg' : ''
                              }`}>
                              {item.label}
                            </span>

                            {/* Animated underline */}
                            {active && (
                              <motion.div
                                layoutId="activeNavItem"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            )}
                          </motion.div>
                        );
                      }}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <DarkModeToggleButton />
              <motion.button
                className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode
                  ? 'hover:bg-gray-700 text-white'
                  : 'hover:bg-gray-100 text-gray-800'
                  }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon
                  icon={isMobileMenuOpen ? faTimes : faBars}
                  className="text-xl"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`fixed top-0 left-0 right-0 z-30 md:hidden border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}
            style={{
              paddingTop: '80px',
              backgroundColor: isDarkMode ? '#19242D' : '#F0F3F2'
            }}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.to}
                  variants={mobileNavItemVariants}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-600'
                        : isDarkMode
                          ? 'hover:bg-gray-800 text-gray-300'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={item.isIcon ? 'text-lg' : 'font-medium'}>
                      {item.label}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-20" />
    </>
  );
}

export default Header;