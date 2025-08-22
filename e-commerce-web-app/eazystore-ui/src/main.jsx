import { ThemeProvider } from './context/ThemeContext.jsx';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import router from './routes/AppRoutes.jsx';
import ToastWrapper from './context/ToastWrapper.jsx';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { StrictMode } from 'react';
import store from './context/store.js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
          <ToastWrapper />
        </Provider>
      </ThemeProvider>
    </Elements>
  </StrictMode>
);