import React from 'react';

const WelcomeIllustration: React.FC = () => (
  <svg width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 16 }}>
    {/* Sky */}
    <rect width="280" height="160" rx="16" fill="#CBE4F7" />
    {/* Sun */}
    <circle cx="210" cy="45" r="22" fill="#FAC775" />
    <circle cx="210" cy="45" r="16" fill="#FDDF9E" opacity="0.6" />
    {/* Back hill */}
    <ellipse cx="140" cy="170" rx="180" ry="60" fill="#97C459" />
    {/* Front hill */}
    <ellipse cx="100" cy="175" rx="160" ry="50" fill="#C0DD97" />
    {/* Flower stems */}
    <line x1="80" y1="125" x2="80" y2="105" stroke="#7A9B4A" strokeWidth="2" />
    <circle cx="80" cy="101" r="5" fill="#ED93B1" />
    <line x1="110" y1="120" x2="110" y2="100" stroke="#7A9B4A" strokeWidth="2" />
    <circle cx="110" cy="96" r="5" fill="#FAC775" />
    <line x1="140" y1="122" x2="140" y2="102" stroke="#7A9B4A" strokeWidth="2" />
    <circle cx="140" cy="98" r="5" fill="#9FE1CB" />
  </svg>
);

export default WelcomeIllustration;
