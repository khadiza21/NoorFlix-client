import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/Router/Router';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import AuthProvider from './components/Provider/AuthProvider'; 
import { Theme } from './components/theme/Theme';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>

    <Theme>
    <RouterProvider router={router} />
    </Theme>
    </AuthProvider>

  </StrictMode>,
)
