import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const skipRedirectPath = sessionStorage.getItem("skipRedirectPath") === "true";
        if (!isAuthenticated && location.pathname !== '/login' && !skipRedirectPath) {
            sessionStorage.setItem("redirectPath", location.pathname);
        }
    }, [isAuthenticated, location.pathname]);
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;