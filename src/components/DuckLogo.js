// This file holds the Duck Publicity logo as a React component
// Uses the logo from the public folder

import React from 'react';

const DuckLogo = ({ className = '', style = {}, ...props }) => (
  <img
    src="/Logo.png.png"
    alt="Duck Publicity Logo"
    className={className}
    style={{ height: '2.5rem', width: '2.5rem', minWidth: '2.5rem', ...style }}
    {...props}
  />
);

export default DuckLogo;
