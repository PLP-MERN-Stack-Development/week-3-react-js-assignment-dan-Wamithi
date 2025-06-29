// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // NEW: Import Link and useLocation

export default function Navbar() {
  const location = useLocation(); // Hook to get the current URL path

  return (
    <nav className="bg-gray-800 p-4 text-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Use Link for the brand/logo to go to the home page */}
        <Link to="/" className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">TaskApp</Link>
        <div>
          {/* Use Link for navigation items */}
          <Link 
            to="/" 
            className={`mr-4 hover:text-gray-300 transition-colors duration-200 ${
              location.pathname === '/' ? 'text-blue-300 font-semibold' : '' // Active link styling
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`hover:text-gray-300 transition-colors duration-200 ${
              location.pathname === '/about' ? 'text-blue-300 font-semibold' : '' // Active link styling
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}