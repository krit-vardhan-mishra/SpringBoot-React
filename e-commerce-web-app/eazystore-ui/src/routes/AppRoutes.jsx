import { createBrowserRouter } from 'react-router-dom';
import '../index.css';
import App from '../App.jsx';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import Contact, { contactAction, contactLoader } from '../pages/Contact';
import Login, { loginAction } from '../pages/Login';
import Cart from '../pages/Cart';
import Error from '../pages/Error';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from '../components/ProductDetail.jsx';
import CheckoutForm from '../pages/CheckoutForm.jsx';
import OrderSuccess from '../pages/OrderSuccess.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Profile, { profileAction, profileLoader } from '../pages/Profile.jsx';
import Orders from '../pages/Orders.jsx';
import AdminOrders, { adminOrdersLoader } from '../components/admin/AdminOrders.jsx';
import Register, { registerAction } from '../pages/Register.jsx';
import Message, { messagesLoader } from '../components/admin/Messages.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'home', element: <HomePage /> },
            { path: 'about', element: <About /> },
            { path: 'contact', element: <Contact />, action: contactAction, loader: contactLoader },
            { path: 'login', element: <Login />, action: loginAction },
            { path: 'register', element: <Register />, action: registerAction },
            { path: 'cart', element: <Cart /> },
            { path: '/products/:productId', element: <ProductDetail /> },
            {
                element: <ProtectedRoute />, children: [
                    { path: 'checkout', element: <CheckoutForm /> },
                    { path: 'order-success', element: <OrderSuccess /> },
                    { path: 'profile', element: <Profile />, loader: profileLoader, action: profileAction, shouldRevalidate: (actionResult) => { return !actionResult?.success } },
                    { path: 'orders', element: <Orders /> },
                    { path: 'admin/orders', element: <AdminOrders />, loader: adminOrdersLoader },
                    { path: 'admin/messages', element: <Message />, loader: messagesLoader },
                ]
            }
        ],
    },
]);

export default router;