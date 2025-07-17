import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Form, useActionData, useNavigation, useSubmit } from 'react-router-dom';
import apiClient from '../api/apiClient';
import SuccessAnimation from '../components/SuccessAnimation';
import { toast } from 'react-toastify';

const Contact = () => {
  const { isDarkMode } = useTheme();
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

  const inputBaseClasses = `p-3 rounded-md border-2 border-blue-500 focus:outline-none focus:ring-2 
    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`;

  const getInputClasses = () =>
    `${inputBaseClasses} ${isDarkMode
      ? 'bg-[#19242D] border-[#2d2d2d] text-white placeholder-gray-400 focus:ring-[#8258d6]'
      : 'bg-white border-gray-600 text-black placeholder-gray-500 focus:ring-[#4c1eab]'
    }`;

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
    <div className={`flex flex-col items-center m-4 pt-4 ${isDarkMode ? 'bg-[#0E1520]' : 'bg-[#F0F3F2]'}`}>
      <span className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-[#c7beda]' : 'text-[#4c1eab]'}`}>
        Contact Us
      </span>

      <div className="max-w-3xl w-full px-4 space-y-6 text-center">
        <p className={`text-lg md:text-sm ${isDarkMode ? 'text-[#dbd7e4]' : 'text-[#2d2b31]'}`}>
          We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to reach out.
        </p>

        <Form ref={formRef} onSubmit={handleSubmit} key={formKey} method='POST' className="flex flex-col space-y-4">
          {/* Name Input */}
          <div className="flex flex-col text-left">
            <label htmlFor="name" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              disabled={isSubmitting}
              className={getInputClasses()}
              placeholder="Your Name"
              required
            />
          </div>

          {/* Email and Mobile Number Inputs */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex flex-col text-left flex-1">
              <label htmlFor="email" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                disabled={isSubmitting}
                className={getInputClasses()}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="flex flex-col text-left flex-1">
              <label htmlFor="mobileNumber" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                disabled={isSubmitting}
                className={getInputClasses()}
                placeholder="Your Mobile Number"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col text-left">
            <label htmlFor="message" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Message</label>
            <textarea
              id="message"
              rows="5"
              name="message"
              disabled={isSubmitting}
              className={`${getInputClasses()} resize-y`}
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 px-8 py-3 bg-[#4c1eab] text-white font-semibold rounded-md shadow-lg
              hover:bg-[#3a178a] focus:outline-none focus:ring-2 focus:ring-[#4c1eab] focus:ring-offset-2
              transition-all duration-300 ease-in-out self-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>

        {/* Error Message */}
        {actionData?.error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {actionData.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;

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
    return {
      error: error.message || 'Failed to submit your message. Please try again.',
      success: 'false'
    };
  }
}