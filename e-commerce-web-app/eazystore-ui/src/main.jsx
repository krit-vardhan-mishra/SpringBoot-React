import { ThemeProvider } from './context/ThemeContext.jsx';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { CartContextProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import router from './routes/AppRoutes.jsx';
import ToastWrapper from './context/ToastWrapper.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
        <ToastWrapper />
      </CartContextProvider>
    </AuthProvider>
  </ThemeProvider>
);