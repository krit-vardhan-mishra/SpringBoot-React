import { ThemeProvider } from './context/ThemeContext.jsx';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { CartContextProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import router from './routes/AppRoutes.jsx';
import ToastWrapper from './context/ToastWrapper.jsx';
import { loadStripe } from "@stripe/stripe-js";
import { Element } from '@stripe/react-stripe-js'
import { StrictMode } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Element stripe={stripePromise}>
      <ThemeProvider>
        <AuthProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
            <ToastWrapper />
          </CartContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </Element>
  </StrictMode>
);