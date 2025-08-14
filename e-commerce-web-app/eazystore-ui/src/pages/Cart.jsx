import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import emptyCartImage from "../assets/utils/emptycart.png";
import { useCart } from '../context/CartContext';
import CartTable from "../components/CartTable";

const Cart = () => {
  const { cart } = useCart();
  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-primary font-extrabold text-center text-primary dark:text-light mt-15 py-2">
          Your Cart
        </h1>
        {!isCartEmpty ? (
          <>
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to="/home"
                className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
              >
                Back to Products
              </Link>
              {/* Proceed to Checkout Button */}
              <Link to="/checkout" className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition">
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center text-gray-600 dark:text-white flex flex-col items-center">
              <p className="max-w-[576px] px-2 mx-auto text-base mb-4">
                Oops... Your cart is empty. Continue shopping
              </p>
              <img
                src={emptyCartImage}
                alt="Empty Cart"
                className="max-w-[300px] mx-auto mb-6 dark:bg-white dark:rounded-md"
              />
              <Link to={'/home'}
                className="py-2 px-4 bg-primary dark:bg-[#e9dfdf] text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-blue-400 transition"
              >
                Back to Products
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;