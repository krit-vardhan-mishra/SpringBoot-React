import React from 'react';
import { Button } from "./ui/Button";
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ProductCard = ({ sticker, title, subTitle, price }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className={`rounded-md h-[500px] w-80 m-8 shadow-md overflow-hidden border-2 flex flex-col ${
        isDarkMode ? 'border-[#4b5563]' : 'border-[#f3f4f6]'
      }`}
      initial={false}
      whileHover={{
        scale: 1.03,
        borderColor: isDarkMode ? '#ffffff' : '#000000',
        boxShadow: isDarkMode
          ? '0px 10px 15px -3px rgba(255,255,255,0.1), 0px 4px 6px -2px rgba(255,255,255,0.05)'
          : '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        borderColor: { duration: 0.15 },
        boxShadow: { duration: 0.15 },
      }}
    >
      <div className="overflow-hidden h-80 bg-gray-400 flex-shrink-0">
        <img
          className="w-full h-full relative object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          src={sticker}
          alt="Sticker"
        />
      </div>

      <div
        className={`flex-1 flex flex-col p-2 ${
          isDarkMode ? 'bg-[#19242D]' : 'bg-[#ffffff]'
        }`}
      >
        <p className="ps-2 pt-2 text-base font-semibold min-h-[1.5rem] line-clamp-1">
          {title || 'Title'}
        </p>
        <p className="ps-2 text-sm flex-1 min-h-[2.5rem] line-clamp-2 mb-2">
          {subTitle || 'Sub-Title'}
        </p>

        <div className="flex justify-between items-center p-2 gap-2 mt-auto mb-2">
          <Button
            className={`${
              isDarkMode
                ? 'text-white bg-[#2E3947]'
                : 'text-[#4a2dce] bg-[#beb9e6]'
            }`}
          >
            ${price ?? 0}
          </Button>
          <Button className="bg-[#4c1eab] text-white">Add to Cart</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
