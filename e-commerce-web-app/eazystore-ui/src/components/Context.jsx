import React from 'react'
import { useTheme } from '../context/ThemeContext';

const Context = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className='text-center px-4'>
            <span className={`font-extrabold text-5xl block mb-2 ${isDarkMode? 'text-[#c7beda]' : 'text-[#4c1eab]'}`}>
                Explore Eazy Stickers!
            </span>
            <p className='text-xl pt-5 font-["Comic_Sans_MS",cursive]'>
                Add a touch of creativity to your space with our wide range of fun and 
                unique stickers. Perfect for any occasion!
            </p>
        </div>
    )
}

export default Context;