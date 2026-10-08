import React from 'react';

interface SkytopLogoProps {
  height?: number;
  className?: string;
  variant?: 'full' | 'emblem' | 'light' | 'dark';
}

export const SkytopLogo: React.FC<SkytopLogoProps> = ({
  height = 48,
  className = '',
  variant = 'full',
}) => {
  return (
    <div className={`d-inline-flex align-items-center ${className}`}>
      <img
        src="/assets/images/logo.png"
        alt="Skytop Global Services Limited"
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
        }}
        className={variant === 'light' ? 'bg-white p-1 rounded shadow-sm' : ''}
      />
    </div>
  );
};
