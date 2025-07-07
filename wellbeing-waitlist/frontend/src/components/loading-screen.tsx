// src/components/LoadingScreen.tsx
import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
      <div className="flex">
        <div className="w-5 h-5 bg-black rounded mx-2.5 animate-[grow-shrink_1.7s_infinite]" style={{ animationDelay: '0s' }}></div>
        <div className="w-5 h-5 bg-black rounded mx-2.5 animate-[grow-shrink_1.7s_infinite]" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-5 h-5 bg-black rounded mx-2.5 animate-[grow-shrink_1.7s_infinite]" style={{ animationDelay: '0.4s' }}></div>
        <div className="w-5 h-5 bg-black rounded mx-2.5 animate-[grow-shrink_1.7s_infinite]" style={{ animationDelay: '0.6s' }}></div>
        <div className="w-5 h-5 bg-black rounded mx-2.5 animate-[grow-shrink_1.7s_infinite]" style={{ animationDelay: '0.8s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;