import React from "react";
import { Link } from "react-router-dom";
import orderSuccessImg from '../assets/utils/order-confirmed.png'

const OrderSuccess = () => {
    return (
    <div className="min-h-[852px]  py-12 sm:pt-20 font-primary bg-normalbg dark:bg-darkbg">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Hurray! Order placed successfully
        </h1>
      </div>
      <div className="text-center text-lg text-gray-600 dark:text-lighter flex flex-col items-center">
        <p className="max-w-[576px] text-center px-4 mx-auto leading-6 mb-6">
          Your order has been placed successfully. The items in your order will
          be delivered within 48 hours.
        </p>
        <img
          src={orderSuccessImg}
          alt="Order Success"
          className="w-full max-w-[450px] mx-auto mb-8"
        />
        <Link
          to="/home"
          className="px-6 py-3 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
        >
          Keep Shopping
        </Link>
      </div>
    </div >
  );
}

export default OrderSuccess;