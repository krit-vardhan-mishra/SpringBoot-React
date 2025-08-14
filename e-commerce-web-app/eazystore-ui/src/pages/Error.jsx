import React from "react";
import errorImage from "../assets/utils/error.png";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const routeError = useRouteError();
  let errorTitle = "Oops! Something went wrong";
  let errorMessage = "An unexpected error occurred. Please try again later.";
  if (routeError) {
    errorTitle = routeError.status;
    errorMessage = routeError.data;
  }
  return (
    <div className="flex flex-col min-h-[980px]">
      <main className="flex-grow">
        <div className="py-12 bg-normalbg dark:bg-darkbg font-primary">
          <div className="max-w-4xl mx-auto px-4 text-center text-4xl font-bold text-red-500">
            {errorTitle}
          </div>
          <div className="text-center text-gray-600 dark:text-gray-300 flex flex-col items-center">
            <p className="max-w-[576px] px-2 mx-auto leading-6 mb-4">
              {errorMessage}
            </p>
            <img
              src={errorImage}
              alt="Error"
              className="w-full max-w-[576px] mx-auto mb-6"
            />
            <Link
              to="/home"
              className="py-3 px-6 hover:underline text-black dark:text-white text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}