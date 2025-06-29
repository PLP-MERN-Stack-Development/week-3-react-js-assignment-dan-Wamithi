// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context object
export const ThemeContext = createContext();

// Create the ThemeProvider component that wraps other components
export const ThemeProvider = ({ children }) => {
  // State to manage the current theme, initialized from localStorage or defaults to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // useEffect to apply the theme class to the document's <html> element
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element
    if (theme === 'dark') {
      root.classList.add('dark'); // Add 'dark' class for Tailwind CSS dark mode
    } else {
      root.classList.remove('dark'); // Remove 'dark' class
    }
    localStorage.setItem('theme', theme); // Save the theme preference to localStorage
  }, [theme]); // Re-run this effect when the 'theme' state changes

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme value and toggle function to all children components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily consume the theme context in any component
export const useTheme = () => useContext(ThemeContext);