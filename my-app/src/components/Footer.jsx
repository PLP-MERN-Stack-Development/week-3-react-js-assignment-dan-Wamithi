// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-6 text-white mt-auto dark:bg-gray-900 transition-colors duration-300"> {/* Added transition */}
      <div className="container mx-auto text-center">
        <div className="mb-2">
          <a href="#" className="mr-4 hover:text-gray-300 transition-colors duration-200">Privacy Policy</a> {/* Added transition */}
          <a href="#" className="hover:text-gray-300 transition-colors duration-200">Terms of Service</a> {/* Added transition */}
        </div>
        <p>&copy; {new Date().getFullYear()} Wamithi TaskApp. All rights reserved.</p>
      </div>
    </footer>
  );
}