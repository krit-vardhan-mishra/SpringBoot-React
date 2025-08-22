import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../context/auth-slice';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
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