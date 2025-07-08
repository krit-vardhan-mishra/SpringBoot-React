import React, { useRef } from "react";
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const buttonRef = useRef(null); 

  const handleToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      toggleTheme({
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      });
    } else {
      toggleTheme(null);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 z-50 relative" // Add z-50 to ensure it's above the overlay
      title="Toggle Dark Mode"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`w-5 h-5 absolute top-0 left-0 transition-all duration-500 ease-in-out transform
            ${isDarkMode ? 'opacity-100 rotate-0 scale-100 text-yellow-400' : 'opacity-0 rotate-180 scale-75 text-yellow-400'}`}
        />
        <Moon
          className={`w-5 h-5 absolute top-0 left-0 transition-all duration-500 ease-in-out transform
            ${isDarkMode ? 'opacity-0 -rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100 text-black'}`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggleButton;