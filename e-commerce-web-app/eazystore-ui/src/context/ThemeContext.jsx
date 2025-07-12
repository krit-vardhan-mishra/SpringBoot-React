import React, { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeTransition, setThemeTransition] = useState({
    active: false,
    fromX: 0,
    fromY: 0,
    toColor: ''
  });

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
    document.body.style.backgroundColor = isDarkMode ? '#0E1520' : '#F0F3F2';
    
    if (themeTransition.active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDarkMode, themeTransition.active]);

  const toggleTheme = (clickCoords) => {
    const nextIsDarkMode = !isDarkMode;
    const toColor = nextIsDarkMode ? '#0E1520' : '#F0F3F2';

    setThemeTransition({
      active: true,
      fromX: clickCoords?.clientX || window.innerWidth / 2,
      fromY: clickCoords?.clientY || window.innerHeight / 2,
      toColor: toColor
    });

    setTimeout(() => {
      setIsDarkMode(nextIsDarkMode);
      setThemeTransition(prev => ({ ...prev, active: false }));
    }, 500);
  };

  const calculateMaxDimension = (x, y) => {
    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    return Math.sqrt(maxX * maxX + maxY * maxY);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}

      <AnimatePresence>
        {themeTransition.active && (
          <motion.div
            key="theme-transition-overlay"
            className={`fixed inset-0 z-40 rounded-full`}
            style={{
              left: themeTransition.fromX,
              top: themeTransition.fromY,
              backgroundColor: isDarkMode ? '#F0F3F2' : '#0E1520',
            }}
            initial={{
              width: 0,
              height: 0,
              x: '-50%',
              y: '-50%',
              opacity: 1,
            }}
            animate={{
              width: calculateMaxDimension(themeTransition.fromX, themeTransition.fromY) * 2,
              height: calculateMaxDimension(themeTransition.fromX, themeTransition.fromY) * 2,
              backgroundColor: themeTransition.toColor,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);