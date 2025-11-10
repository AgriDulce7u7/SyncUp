import React from 'react';
import './Logo.module.css';

const Logo = ({ size = 'large' }) => {
  return (
      <div className={`logo-circles ${size}`}>
        <div className="logo-wave-outer"></div>
        <div className="logo-wave-middle"></div>
        <div className="logo-core">
          <div className="logo-equalizer">
            <div className="logo-bar logo-bar-1"></div>
            <div className="logo-bar logo-bar-2"></div>
            <div className="logo-bar logo-bar-3"></div>
            <div className="logo-bar logo-bar-4"></div>
            <div className="logo-bar logo-bar-5"></div>
          </div>
        </div>
      </div>
  );
};

export default Logo;