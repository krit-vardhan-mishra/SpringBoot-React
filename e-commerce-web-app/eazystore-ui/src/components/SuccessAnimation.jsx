import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie-player';
import successAnimationData from '../assets/success-animation.json';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const SuccessAnimation = ({ onComplete }) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const { isDarkMode } = useTheme();
  const lottieRef = useRef();

  useEffect(() => {
    if (animationFinished) {
      toast.success("Your message has been submitted successfully...!", { 
        toastId: 'contact-success', 
      });
    }
  }, [animationFinished]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 ${isDarkMode ? 'bg-[#19242D]' : 'bg-white'}`}>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Lottie
              loop={false}
              animationData={successAnimationData}
              play
              style={{ width: 150, height: 150 }}
              onComplete={() => {
                setAnimationFinished(true);
                onComplete?.();
              }}
            />
          </div>

          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Success!
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-[#dbd7e4]' : 'text-[#2d2b31]'}`}>
            Your message has been sent successfully!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;