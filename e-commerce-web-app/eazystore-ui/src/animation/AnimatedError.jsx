import React from 'react'

const AnimatedError = ({ error }) => {
  const text = `Error: ${error}`;
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <span className="text-xl font-bold text-gray-300">{text}</span>
        <span 
          className="absolute top-0 left-0 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent via-red-600 to-transparent"
          style={{
            backgroundSize: '200% 100%',
            animation: 'wave 5s ease-in-out infinite'
          }}
        >
          {text}
        </span>
        <style>{`
          @keyframes wave {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AnimatedError;