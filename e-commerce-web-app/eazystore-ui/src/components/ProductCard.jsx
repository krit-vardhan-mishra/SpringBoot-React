import React from 'react';
import { Button } from "./ui/Button";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../context/cart-slice';

const ProductCard = ({ product }) => {
  const { productId, name, subTitle, price, imageUrl } = product;
  const dispatch = useDispatch();

  const handleAddClick = (e) => {
    e.preventDefault();
    dispatch(addToCart({ product, quantity: 1 }));
  }

  return (
    <Link to={`/products/${productId}`} state={{ product }}>
      <motion.div
        className="rounded-md h-[500px] w-80 m-8 shadow-md overflow-hidden border-2 flex flex-col border-[#f3f4f6] dark:border-[#4b5563] transition-colors duration-300"
        initial={false}
        whileHover={{
          scale: 1.03,
          transition: {
            duration: 0.3,
            ease: 'easeInOut'
          }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="overflow-hidden h-80 bg-gray-400 flex-shrink-0">
          <img
            className="w-full h-full relative object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            src={`/stickers/${imageUrl}`}
            alt="Product"
          />
        </div>

        <div className="flex-1 flex flex-col p-2 bg-[#ffffff] dark:bg-[#19242D] transition-colors duration-300">
          <p className="ps-2 pt-2 text-base font-semibold min-h-[1.5rem] line-clamp-1 text-black dark:text-white">
            {name || 'Title'}
          </p>
          <p className="ps-2 text-sm flex-1 min-h-[2.5rem] line-clamp-2 mb-2 text-gray-700 dark:text-gray-300">
            {subTitle || 'Sub-Title'}
          </p>

          <div className="flex justify-between items-center p-2 gap-2 mt-auto mb-2">
            <Button className="text-white bg-[#beb9e6] dark:text-white dark:bg-[#2E3947] hover:bg-[#a299d9] dark:hover:bg-[#3a4553] transition-colors duration-200">
              ${price ?? 0}
            </Button>
            <Button onClick={handleAddClick} className="bg-[#4c1eab] text-white hover:bg-[#3a178a] transition-colors duration-200">
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;