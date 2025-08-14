import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faTags,
  faBars,
  faTimes,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import DarkModeToggleButton from './ui/DarkModeToggleButton';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Header() {
  const isAdmin = true;
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const { totalQuantity } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    toast.success('Logged out successfully!');
    navigate('/home');
  };

  const navLinkClass =
    'text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter';

  const dropdownLinkClass =
    'block w-full text-left px-4 py-2 text-lg font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600';

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-md bg-white/90 dark:bg-darkbg/90 shadow-lg'
          : 'bg-white dark:bg-darkbg'
          } text-black dark:text-white border-b border-gray-300 dark:border-gray-600`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg transition-colors duration-300 bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white">
                <FontAwesomeIcon icon={faTags} className="text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Easy Stickers
                </span>
                <span className="text-xs opacity-60 text-gray-600 dark:text-gray-400">Premium Quality</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-6">
                <DarkModeToggleButton />

                {navItems.map((item) => {
                  const isHome =
                    item.to === '/home' &&
                    (location.pathname === '/' || location.pathname === '/home');
                  return (
                    <NavLink key={item.to} to={item.to} className="relative group">
                      {({ isActive }) => {
                        const active = isHome || isActive;
                        return (
                          <div
                            className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${active
                              ? ' underline dark:text-white'
                              : 'text-gray-700 dark:text-gray-300 dark:hover:underline  hover:text-gray-900 dark:hover:text-white'
                              }`}
                          >
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </div>
                        );
                      }}
                    </NavLink>
                  );
                })}

                {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                    <button onClick={toggleUserMenu} className="relative text-primary">
                      <span className={navLinkClass}>
                        {
                          `Hello ${user.name.length > 5 ? `${user.name.slice(0, 5)}...` : user.name
                          }`
                        }</span>
                      <FontAwesomeIcon icon={faAngleDown} className="w-6 h-6" />
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
                        <ul className="py-2">
                          <li>
                            <Link to="/profile" className={dropdownLinkClass}>
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link to="/orders" className={dropdownLinkClass}>
                              Orders
                            </Link>
                          </li>
                          {isAdmin && (
                            <li>
                              <button
                                onClick={toggleAdminMenu}
                                className={`${dropdownLinkClass} flex items-center justify-between`}
                              >
                                Admin <FontAwesomeIcon icon={faAngleDown} />
                              </button>
                              {isAdminMenuOpen && (
                                <ul className="ml-4 mt-2 space-y-2">
                                  <li>
                                    <Link to="/admin/orders" className={dropdownLinkClass}>
                                      Orders
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/admin/messages" className={dropdownLinkClass}>
                                      Messages
                                    </Link>
                                  </li>
                                </ul>
                              )}
                            </li>
                          )}
                          <li>
                            <Link to="/home" onClick={handleLogout} className={dropdownLinkClass}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? `underline ${navLinkClass}` : navLinkClass
                    }
                  >
                    Login
                  </NavLink>
                )}

                {/* Cart */}
                <NavLink to="/cart" className="relative group">
                  {({ isActive }) => (
                    <div
                      className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${isActive
                        ? ' underline dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 dark:hover:underline  hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                      <div className="relative">
                        <FontAwesomeIcon icon={faShoppingBasket} className="text-lg" />
                        {totalQuantity > 0 && (
                          <span className="absolute -top-4 -right-4 bg-yellow-500 dark:bg-rose-500 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center">
                            {totalQuantity}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </NavLink>
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <DarkModeToggleButton />
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-30 md:hidden border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-darkbg"
          style={{ paddingTop: '80px' }}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </div>
            ))}

            {/* Mobile Cart */}
            <div>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <FontAwesomeIcon icon={faShoppingBasket} className="text-lg" />
                    {totalQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-500 dark:bg-rose-500 text-white text-xs rounded-full px-1 min-w-[16px] h-[16px] flex items-center justify-center">
                        {totalQuantity}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">Cart</span>
                </div>
              </NavLink>
            </div>

            {isAuthenticated ? (
              <div>
                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/home"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleLogout(e);
                  }}
                  className="block px-4 py-3 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="block px-4 py-3 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}

export default Header;