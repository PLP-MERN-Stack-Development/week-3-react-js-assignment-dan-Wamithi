// src/components/Button.jsx
import React from 'react';

export default function Button({ variant = 'primary', onClick, children, className = '', type = 'button' }) {
  // Added transition-colors and duration-200 for smooth color changes
  let baseClasses = 'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 ';
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-400 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600';
      break;
    case 'danger':
      variantClasses = 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800';
      break;
    default:
      variantClasses = 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800';
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}