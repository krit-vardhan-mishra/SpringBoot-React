import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.title = "Contact Us";
  }, [])
  
  return (
    <div className={`flex flex-col items-center m-4 pt-4 ${isDarkMode ? 'bg-[#0E1520]' : 'bg-[#F0F3F2]'}`}>
      <span className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-[#c7beda]' : 'text-[#4c1eab]'}`}>
        Contact Us
      </span>

      <div className="max-w-3xl w-full px-4 space-y-6 text-center">
        <p className={`text-lg md:text-xl ${isDarkMode ? 'text-[#dbd7e4]' : 'text-[#2d2b31]'}`}>
          We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to reach out.
        </p>

        <form className="flex flex-col space-y-4">
          {/* Name Input */}
          <div className="flex flex-col text-left">
            <label htmlFor="name" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Name</label>
            <input
              type="text"
              id="name"
              className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2
                          ${isDarkMode ? 'bg-[#19242D] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
              placeholder='Your Name'
            />
          </div>

          {/* Email and Mobile Number Inputs */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex flex-col text-left flex-1">
              <label htmlFor="email" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Email</label>
              <input
                type="email"
                id="email"
                className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2
                            ${isDarkMode ? 'bg-[#19242D] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
                placeholder='Your Email'
              />
            </div>
            <div className="flex flex-col text-left flex-1">
              <label htmlFor="mobile" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Mobile Number</label>
              <input
                type="tel" // Use type="tel" for phone numbers
                id="mobile"
                className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2
                            ${isDarkMode ? 'bg-[#19242D] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
                placeholder='Your Mobile Number'
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col text-left">
            <label htmlFor="message" className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Message</label>
            <textarea
              id="message"
              rows="5" // Set initial rows for textarea
              className={`p-3 rounded-md border-2 focus:outline-none focus:ring-2 resize-y
                          ${isDarkMode ? 'bg-[#19242D] border-[#2d2d2d] text-white focus:ring-[#8258d6]' : 'bg-white border-gray-300 text-black focus:ring-[#4c1eab]'}`}
              placeholder='Your Message'
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-[#4c1eab] text-white font-semibold rounded-md shadow-lg
                       hover:bg-[#3a178a] focus:outline-none focus:ring-2 focus:ring-[#4c1eab] focus:ring-offset-2
                       transition-all duration-300 ease-in-out self-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
