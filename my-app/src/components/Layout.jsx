// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    // Added bg-gray-100 dark:bg-gray-900 transition-colors duration-300 for smooth background theme change
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8"> {/* Responsive padding */}
        {children}
      </main>
      <Footer />
    </div>
  );
}