// src/components/Task.jsx
import React from 'react';
import Button from './Button'; 

export default function Task({ id, title, completed, onToggle, onDelete }) {
  return (
    <div 
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded shadow-md 
                  ${completed ? 'bg-green-100 dark:bg-green-800' : 'bg-white dark:bg-gray-700'}
                  text-gray-800 dark:text-white 
                  transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg`} // Added hover effects & transition
    >
      <span 
        className={`flex-1 text-lg sm:text-xl font-medium mb-2 sm:mb-0 ${completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}
      >
        {title}
      </span>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end"> {/* Ensured buttons are at end on small screens */}
        <Button 
          onClick={() => onToggle(id)} 
          variant={completed ? 'secondary' : 'primary'} 
        >
          {completed ? 'Undo' : 'Complete'}
        </Button>
        <Button 
          onClick={() => onDelete(id)} 
          variant="danger" 
        >
          Delete
        </Button>
      </div>
    </div>
  );
}