import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/Router/Router';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import AuthProvider from './components/Provider/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>

      <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>,
)
