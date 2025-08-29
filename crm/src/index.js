import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);

reportWebVitals();
