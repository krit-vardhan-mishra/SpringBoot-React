import { ThemeProvider } from './context/ThemeContext.jsx';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact, { contactAction } from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Error from './pages/Error';
import './index.css';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/ProductDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact />, action: contactAction },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'cart', element: <Cart /> },
      { path: '/products/:productId', element: <ProductDetail /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={3500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}
      transition={Bounce}
    />
  </ThemeProvider>
);
