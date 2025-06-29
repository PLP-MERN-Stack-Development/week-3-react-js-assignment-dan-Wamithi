// src/App.jsx
import React, { useState } from 'react';
import { useLocalStorage } from "./hooks/useLocalStorage.jsx"; // Updated .jsx extension
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx"; // Updated .jsx extension

// NEW: Import Routes and Route from react-router-dom
import { Routes, Route } from 'react-router-dom'; 

// Import your UI components
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import Layout from "./components/Layout";
import Button from "./components/Button";
import Card from "./components/Card";

// Helper component for Theme Toggle
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button 
      onClick={toggleTheme} 
      variant="secondary" 
      className="mb-4 sm:mb-0 transition-colors duration-300 ease-in-out" 
    >
      Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'})
    </Button>
  );
}

// Helper component for Task Filter Buttons
function TaskFilterButtons({ currentFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap justify-center space-x-2 mb-6"> 
      <Button 
        variant={currentFilter === 'all' ? 'primary' : 'secondary'} 
        onClick={() => onFilterChange('all')}
        className="transition-colors duration-200"
      >
        All
      </Button>
      <Button 
        variant={currentFilter === 'active' ? 'primary' : 'secondary'} 
        onClick={() => onFilterChange('active')}
        className="transition-colors duration-200"
      >
        Active
      </Button>
      <Button 
        variant={currentFilter === 'completed' ? 'primary' : 'secondary'} 
        onClick={() => onFilterChange('completed')}
        className="transition-colors duration-200"
      >
        Completed
      </Button>
    </div>
  );
}

// NEW: Create a dedicated HomePage component for your Task Dashboard logic
// This makes your App.jsx cleaner and better organized for routing
function HomePage({ tasks, filter, setTasks, toggleTask, addTask, deleteTask, setFilter }) {
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') {
          return !task.completed;
        } else if (filter === 'completed') {
          return task.completed;
        }
        return true; 
    });

    return (
        <> {/* Use a React Fragment to group these elements */}
            {/* Header section with responsive layout for title and theme toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-0"> 
                    Task Dashboard
                </h1>
                <ThemeToggle /> 
            </div>
            
            <Card className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Task</h2>
                <TaskForm onAdd={addTask} /> 
            </Card>

            <TaskFilterButtons currentFilter={filter} onFilterChange={setFilter} />

            <Card>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Your Tasks</h2>
                {filteredTasks.length === 0 && tasks.length > 0 && filter !== 'all' ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                        No {filter} tasks. Try changing the filter!
                    </p>
                ) : filteredTasks.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">No tasks yet! Add a new one above.</p>
                ) : (
                    <div className="space-y-3"> 
                        {filteredTasks.map(task => (
                            <Task 
                                key={task.id} 
                                {...task} 
                                onToggle={toggleTask} 
                                onDelete={deleteTask} 
                            /> 
                        ))}
                    </div>
                )}
            </Card>

            <div className="mt-8 text-center">
                <Button 
                    variant="danger" 
                    onClick={() => {
                        if (window.confirm('Are you sure you want to clear ALL tasks? This action cannot be undone.')) {
                            setTasks([]);
                        }
                    }} 
                    className="ml-0 sm:ml-4 transition-transform transform hover:scale-105" 
                >
                    Clear All Tasks
                </Button>
            </div>
        </>
    );
}


// NEW: Create an AboutPage component (for demonstration)
function AboutPage() {
    return (
        <Card>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About Our Task App</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                This is a simple yet powerful task management application built with React and Tailwind CSS.
                It features task creation, completion toggling, deletion, filtering, and local storage persistence.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                Developed as part of a learning journey to understand React hooks, context API, and responsive design.
            </p>
        </Card>
    );
}


// Main App component
export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    { id: 1, title: "Write Lesson Plan", completed: false },
    { id: 2, title: "Review MongoDB Quiz", completed: true }
  ]);

  const [filter, setFilter] = useState('all'); 

  const toggleTask = id => {
    setTasks(curr =>
      curr.map(t =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const addTask = title => {
    setTasks(curr => [
      { id: Date.now(), title, completed: false },
      ...curr
    ]);
  };

  const deleteTask = id => {
    setTasks(curr => curr.filter(t => t.id !== id));
  };

  return (
    <ThemeProvider>
      <Layout>
        {/* Define your routes here */}
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                tasks={tasks} 
                filter={filter} 
                setTasks={setTasks} 
                toggleTask={toggleTask} 
                addTask={addTask} 
                deleteTask={deleteTask} 
                setFilter={setFilter} 
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          {/* You can add more routes here, e.g., for task details, settings etc. */}
          {/* Example for a 404 Not Found page */}
          <Route path="*" element={
            <Card>
                <h2 className="text-2xl font-bold text-red-500 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-700 dark:text-gray-300">Oops! The page you are looking for does not exist.</p>
            </Card>
          } />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}