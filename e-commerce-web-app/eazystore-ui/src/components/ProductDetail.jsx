import React, { useRef, useState } from 'react'
import { faArrowLeft, faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductDetail() {
    const location = useLocation();
    const product = location.state?.product;
    const navigate = useNavigate();
    const { name, subTitle, price, imageUrl } = product;
    const imagePath = `/stickers/${imageUrl}`;
    const [quantity, setQuantity] = useState(1);
    const zoomRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState("center");

    const handleMouseMove = (e) => {
        const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`); 
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setBackgroundPosition("center");
    }

    const handleViewCart = () => navigate("/cart");

    return (
        <div className="min-h-[852px] flex items-center justify-center px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
            <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row md:space-x-8 px-6 p-8">
                {/* Product Image with Zoom Effect */}
                <div
                    ref={zoomRef}
                    onMouseMove={isHovering ? handleMouseMove : null}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="w-full md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg overflow-hidden bg-cover"
                    style={{
                        backgroundImage: `url(${imagePath})`,
                        backgroundSize: isHovering ? "200%" : "cover",
                        backgroundPosition: backgroundPosition,
                        minHeight: "400px", // Add minimum height
                    }}
                >
                    <img
                        src={imagePath}
                        alt={name}
                        className="w-full h-full opacity-0"
                        style={{ minHeight: "400px" }} // Match the container height
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 flex flex-col space-y-6 mt-8 md:mt-0">
                    <Link
                        to="/home"
                        className="inline-flex items-center text-primary dark:text-light font-medium hover:text-dark dark:hover:text-lighter"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back To All Products
                    </Link>

                    <div>
                        <h1 className="text-3xl font-extrabold text-primary dark:text-light mb-4">
                            {name}
                        </h1>
                        <p className="text-lg text-dark dark:text-lighter mb-4">
                            {subTitle}
                        </p>
                        <div className="text-2xl font-bold text-primary dark:text-light">
                            ${price}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {/* Quantity Input */}
                        <div className="flex items-center space-x-4">
                            <label
                                htmlFor="quantity"
                                className="text-primary dark:text-light"
                            >
                                Qty:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-16 px-2 py-1 border rounded-md focus:ring focus:ring-light dark:focus:ring-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        {/* Add to Cart Button */}
                        <button className="w-full px-4 py-2 bg-primary dark:bg-light text-white dark:text-black rounded-md text-lg font-semibold hover:bg-dark dark:hover:bg-lighter transition">
                            Add to Cart
                            <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
                        </button>

                        {/* View Cart Button */}
                        <button
                            onClick={handleViewCart}
                            className="w-full px-4 py-2 bg-primary dark:bg-light text-white dark:text-black rounded-md text-lg font-semibold hover:bg-dark dark:hover:bg-lighter transition"
                        >
                            View Cart
                            <FontAwesomeIcon icon={faShoppingBasket} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;