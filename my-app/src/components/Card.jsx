// src/components/Card.jsx
import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    // Added transition-colors and duration-300 for smooth theme changes
    <div className={`bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}