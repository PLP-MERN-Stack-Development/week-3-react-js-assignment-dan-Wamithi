// src/components/TaskForm.jsx
import React, { useState } from 'react';
import Button from './Button'; 

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return; 
    onAdd(text);
    setText(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2"> {/* Added responsive gap */}
      <input
        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                   dark:bg-gray-600 dark:border-gray-500 dark:text-white 
                   transition-colors duration-200" // Added transition
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New Task...."
      />
      <Button
        type="submit"
        variant="primary" 
        className="rounded" // Removed specific rounded-r/l for consistency with gap
      >
        Add
      </Button>
    </form>
  );
}