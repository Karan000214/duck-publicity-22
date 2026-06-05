// This file holds the Duck Publicity logo as a React component using the provided PNG with transparent background.
// It uses an <img> tag for pixel-perfect rendering.

import React from 'react';
import logoSrc from '../assets/duck-logo-transparent.png';

const DuckLogo = ({ className = '', style = {}, ...props }) => (
  <img
    src={logoSrc}
    alt="Duck Publicity Logo"
    className={className}
    style={{ height: '2.5rem', width: '2.5rem', minWidth: '2.5rem', ...style }}
    {...props}
  />
);

export default DuckLogo;
