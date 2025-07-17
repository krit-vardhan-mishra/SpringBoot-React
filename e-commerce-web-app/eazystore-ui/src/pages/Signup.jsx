import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.title = "Signup";
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${isDarkMode ? 'bg-[#0E1520]' : 'bg-[#F0F3F2]'}`}>
      {/* Signup Card Container */}
      <div className={`max-w-md w-full p-8 rounded-lg shadow-lg flex flex-col items-center
                      ${isDarkMode ? 'bg-[#19242D] text-white' : 'bg-white text-black'}`}>
        <span className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-[#c7beda]' : 'text-[#4c1eab]'}`}>
          Sign Up
        </span>

        <form className="flex flex-col space-y-5 w-full">
          {/* Username Input */}
          <div className="flex flex-col text-left">
            <label htmlFor="username" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Username</label>
            <input
              type="text"
              id="username"
              className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2
                          ${isDarkMode ? 'bg-[#2E3947] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
              placeholder='Choose a Username'
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col text-left">
            <label htmlFor="email" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Email</label>
            <input
              type="email"
              id="email"
              className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2
                          ${isDarkMode ? 'bg-[#2E3947] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
              placeholder='Your Email'
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col text-left">
            <label htmlFor="password" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Password</label>
            <input
              type="password"
              id="password"
              className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2
                          ${isDarkMode ? 'bg-[#2E3947] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
              placeholder='Create a Password'
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col text-left">
            <label htmlFor="confirmPassword" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2
                          ${isDarkMode ? 'bg-[#2E3947] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
              placeholder='Repeat your Password'
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-[#4c1eab] text-white font-semibold rounded-md shadow-lg
                       hover:bg-[#3a178a] focus:outline-none focus:ring-2 focus:ring-[#4c1eab] focus:ring-offset-2
                       transition-all duration-300 ease-in-out self-center w-full"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <span className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to='/login' className={`font-semibold ${isDarkMode ? 'text-[#c7beda] hover:text-white' : 'text-[#4c1eab] hover:text-[#3a178a]'}`}>
              Login Here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;