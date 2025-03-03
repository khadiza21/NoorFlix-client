import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import ReactDOM from 'react-dom/client';
//import { BrowserRouter } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/Router/Router';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div >
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
