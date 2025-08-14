import React from 'react';
import { GlowCapture, Glow } from "@codaworks/react-glow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className='p-4 mt-auto flex items-center justify-center gap-2'>
            <p>Made with</p>
            <GlowCapture>
                <Glow className='Glow: text-red-500 Glow:shadow-lg'>
                    <FontAwesomeIcon icon={faHeart} className="text-red-500 heartbeat" />
                </Glow>
            </GlowCapture>
            <p>by <b>Krit</b></p>
        </div>
    );
};

export default Footer;