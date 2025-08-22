import React, { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import apiClient from '../api/apiClient';
import SuccessAnimation from '../components/SuccessAnimation';
import { toast } from 'react-toastify';

const Contact = () => {
  const contactInfo = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const formRef = useRef(null);
  const submit = useSubmit();

  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  useEffect(() => {
    if (actionData?.success === 'true') {
      setShowSuccess(true);
    }
  }, [actionData]);

  const handleAnimationComplete = () => {
    setShowSuccess(false);
    setFormKey(prev => prev + 1);
    formRef.current?.reset();
    toast.success("Your message has been submitted successfully...!");
  }

  const isSubmitting = navigation.state === 'submitting';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formRef.current) {
      toast.error("Form reference is not available. Please try again.");
      return;
    }

    const userConfirmed = window.confirm("Are you sure you want to submit the form?");

    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: 'post' });
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  if (showSuccess) {
    return <SuccessAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="flex flex-col items-center m-4 pt-4 bg-[#F0F3F2] dark:bg-[#0E1520]">
      <span className="text-4xl font-bold mb-6 text-[#4c1eab] dark:text-[#c7beda]">
        Contact Us
      </span>

      <div className="max-w-6xl w-full px-4 space-y-6 text-center">
        <p className="text-lg md:text-sm text-[#2d2b31] dark:text-[#dbd7e4]">
          We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to reach out.
        </p>

        {/* ✅ Fixed Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full mx-auto mt-8 items-stretch">
          
          {/* Contact Info Box */}
          <div className="order-2 lg:order-1 text-primary dark:text-light p-6 rounded-lg bg-white dark:bg-[#1b1f28] shadow h-fit">
            <h2 className="text-2xl font-semibold mb-4 text-left">Contact Info</h2>
            {contactInfo && (
              <div className="text-left space-y-3">
                <p>
                  <strong>Phone:</strong> {contactInfo.phone}
                </p>
                <p>
                  <strong>Email:</strong> {contactInfo.email}
                </p>
                <p>
                  <strong>Address:</strong> {contactInfo.address}
                </p>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2 bg-white dark:bg-[#1b1f28] p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6 text-left text-black dark:text-white">Send us a Message</h2>
            <Form ref={formRef} onSubmit={handleSubmit} key={formKey} method='POST' className="flex flex-col space-y-4">
              {/* Name Input */}
              <div className="flex flex-col text-left">
                <label htmlFor="name" className="text-lg font-semibold mb-1 text-black dark:text-white">Name</label>
                <input
                  type="text"
                  id="name"
                  minLength={5}
                  maxLength={30}
                  name="name"
                  disabled={isSubmitting}
                  className={`p-3 rounded-md border-2 border-blue-500 focus:outline-none focus:ring-2 
                  bg-white focus:border-gray-600 text-black placeholder-gray-500 focus:ring-[#4c1eab]
                  dark:bg-[#19242D] dark:border-[#2d2d2d] dark:text-white dark:placeholder-gray-400 dark:focus:ring-[#8258d6]
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Your Name"
                  required
                />
                {actionData?.errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.name}
                  </p>
                )}
              </div>

              {/* Email + Mobile */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex flex-col text-left flex-1">
                  <label htmlFor="email" className="text-lg font-semibold mb-1 text-black dark:text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    disabled={isSubmitting}
                    className={`p-3 rounded-md border-2 border-blue-500 focus:outline-none focus:ring-2 
                    bg-white text-black placeholder-gray-500 focus:ring-[#4c1eab]
                    dark:bg-[#19242D] dark:border-[#2d2d2d] dark:text-white dark:placeholder-gray-400 dark:focus:ring-[#8258d6]
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Your Email"
                    required
                  />
                  {actionData?.errors?.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col text-left flex-1">
                  <label htmlFor="mobileNumber" className="text-lg font-semibold mb-1 text-black dark:text-white">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    pattern='^\d{10}$'
                    required
                    name="mobileNumber"
                    disabled={isSubmitting}
                    title='Mobile number must be exactly 10 digits'
                    className={`p-3 rounded-md border-2 border-blue-500 focus:outline-none focus:ring-2 
                    bg-white text-black placeholder-gray-500 focus:ring-[#4c1eab]
                    dark:bg-[#19242D] dark:border-[#2d2d2d] dark:text-white dark:placeholder-gray-400 dark:focus:ring-[#8258d6]
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Your Mobile Number"
                  />
                  {actionData?.errors?.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col text-left">
                <label htmlFor="message" className="text-lg font-semibold mb-1 text-black dark:text-white">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  name="message"
                  disabled={isSubmitting}
                  minLength={5}
                  maxLength={500}
                  className={`p-3 rounded-md border-2 border-blue-500 focus:outline-none focus:ring-2 resize-y
                  bg-white text-black placeholder-gray-500 focus:ring-[#4c1eab]
                  dark:bg-[#19242D] dark:border-[#2d2d2d] dark:text-white dark:placeholder-gray-400 dark:focus:ring-[#8258d6]
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Your Message"
                  required
                ></textarea>
                {actionData?.errors?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-6 px-8 py-3 bg-[#4c1eab] text-white font-semibold rounded-md shadow-lg
                hover:bg-[#3a178a] focus:outline-none focus:ring-2 focus:ring-[#4c1eab] focus:ring-offset-2
                transition-all duration-300 ease-in-out self-start ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          </div>
        </div>

        {/* Error Message */}
        {actionData?.error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded max-w-4xl mx-auto">
            {actionData.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;

// Action Function
export async function contactAction({ request }) {
  const data = await request.formData();
  const contactData = {
    name: data.get('name'),
    email: data.get('email'),
    mobileNumber: data.get('mobileNumber'),
    message: data.get('message'),
  };
  try {
    await apiClient.post('/contacts/', contactData);
    return { success: 'true' };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
      error.message ||
      "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}

// Loader Function
export async function contactLoader() {
  try {
    const response = await apiClient.get('/contacts/');
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
      error.message ||
      "Failed to load contact information. Please try again.",
      { status: error.status || 500 }
    );
  }
}