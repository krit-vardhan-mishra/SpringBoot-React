import React, { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.title = "About Us";
  }, [])

  return (
    <div className="flex flex-col items-center m-4 pt-4">
      <span className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-[#c7beda]' : 'text-[#4c1eab]'}`}>
        About Us
      </span>

      <div className="max-w-3xl w-full space-y-6 text-center">
        <p>
          <b className={`${isDarkMode ? 'text-[#8258d6]' : 'text-[#2d2b31]'}`}>eazy sticker</b> store is an initiative by
          <b className={`ml-1 ${isDarkMode ? 'text-[#8258d6]' : 'text-[#2d2b31]'}`}>Designs by Krit</b> dedicated to offering you the most sought-after stickers and posters!
        </p>

        <div className="flex flex-col space-y-6 text-left">
          <div>
            <p className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-[#c7beda]' : 'text-[#4c1eab]'}`}>Why Choose Us?</p>
          </div>

          <div>
            <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Premium Quality</span>
            <p className="text-base mt-2">
              We strive to provide every customer with the utmost satisfaction by delivering high-quality vinyl stickers crafted with care and precision.
            </p>
          </div>

          <div>
            <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Product Innovation</span>
            <p className="text-base mt-2">
              Our vinyl stickers feature a premium matte or glossy finish lamination and are made with advanced adhesive technology. Designed to withstand all weather conditions and resist scratches, our stickers are gentle enough to preserve the surface of your beloved gadgets.
            </p>
          </div>

          <div>
            <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Excellent Service</span>
            <p className="text-base mt-2">
              Customer satisfaction is our top priority, and we're committed to delivering an exceptional shopping experience.
            </p>
          </div>

          <div>
            <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Design You'll Love</span>
            <p className="text-base mt-2">
              With over 1,000 designs, our collection ranges from relatable and seriously funny to delightfully quirky. And we're just getting started—stay tuned for more exciting products and designs!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;