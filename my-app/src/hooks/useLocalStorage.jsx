
// src/hooks/useLocalStorage.jsx
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {

  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
     
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {

      return initialValue;
    }
  });

 
  useEffect(() => {
    try {
      
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    
      console.log("Error writing to localStorage:", error);
    }
  }, [key, value]); 

  return [value, setValue];
}