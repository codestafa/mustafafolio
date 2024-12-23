// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind entry point
import Contact from './components/Contact';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="">
      {/* Sidebar for Larger Screens */}
      <aside className="hidden xl:block fixed lg:top-1/3 lg:left-50 transform w-64 bg-stone-100 p-4 shadow-lg rounded-lg">
        <Contact />
      </aside>
      {/* Main Application */}
      <div className="xl:ml-72">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
