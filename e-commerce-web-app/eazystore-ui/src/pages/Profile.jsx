import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../components/PageTitle";
import { useDispatch } from 'react-redux';
import { logout, loginSuccess } from '../context/auth-slice';

export default function Profile() {
  const initialProfileData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(initialProfileData);

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.profileData.emailUpdated) {
        sessionStorage.setItem("skipRedirectPath", "true");
        dispatch(logout());
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        toast.success(
          "Logged out successfully! Login again with updated email"
        );
        navigate("/login");
      } else {
        toast.success("Your Profile details are saved successfully!");
        setProfileData(actionData.profileData);

        if (actionData.profileData) {
          const updatedUser = {
            ...profileData,
            ...actionData.profileData,
          };

          dispatch(loginSuccess({ jwtToken: localStorage.getItem("jwtToken"), user: updatedUser }));
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    }
  }, [actionData, dispatch, navigate]);

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const h2Style =
    "block text-2xl font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

  return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="My Profile" />

      <Form method="PUT" className="space-y-6 max-w-[768px] mx-auto">
        <div>
          <h2 className={h2Style}>Personal Details</h2>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className={textFieldStyle}
            value={profileData.name}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            minLength={5}
            maxLength={30}
          />
          {actionData?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={textFieldStyle}
              required
            />
            {actionData?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="mobileNumber" className={labelStyle}>
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              pattern="^\d{10}$"
              title="Mobile number must be exactly 10 digits"
              value={profileData.mobileNumber}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  mobileNumber: e.target.value,
                }))
              }
              placeholder="Your Mobile Number"
              className={textFieldStyle}
            />
            {actionData?.errors?.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.mobileNumber}
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className={h2Style}>Address Details</h2>
          <label htmlFor="street" className={labelStyle}>
            Street
          </label>
          <input
            id="street"
            name="street"
            type="text"
            placeholder="Street details"
            value={profileData.address?.street}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  street: e.target.value,
                }
              }))
            }
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
          {actionData?.errors?.street && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.street}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className={labelStyle}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Your City"
              value={profileData.address?.city}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    city: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
              required
              minLength={3}
              maxLength={30}
            />
            {actionData?.errors?.city && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="state" className={labelStyle}>
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              required
              minLength={2}
              maxLength={30}
              placeholder="Your State"
              value={profileData.address?.state}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    state: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
            />
            {actionData?.errors?.state && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.state}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="postalCode" className={labelStyle}>
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="Your Postal Code"
              value={profileData.address?.postalCode}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    postalCode: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
              required
              pattern="^\d{5}$"
              title="Postal code must be exactly 5 digits"
            />
            {actionData?.errors?.postalCode && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.postalCode}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="country" className={labelStyle}>
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              minLength={2}
              maxLength={2}
              placeholder="Your Country"
              value={profileData.address?.country}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    country: e.target.value,
                  },
                }))
              }
              className={textFieldStyle}
            />
            {actionData?.errors?.country && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.country}
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 mt-8 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function profileLoader() {
  try {
    const response = await apiClient.get("/profile");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
      error.message ||
      "Failed to fetch profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export async function profileAction({ request }) {
  const data = await request.formData();

  const profileData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    street: data.get("street"),
    city: data.get("city"),
    state: data.get("state"),
    postalCode: data.get("postalCode"),
    country: data.get("country"),
  };
  try {
    const response = await apiClient.put("/profile", profileData);
    return { success: true, profileData: response.data };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
      error.message ||
      "Failed to save profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}