import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect to login but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export const PublicRoute = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        // If user is already logged in, redirect to home (which renders Dashboard)
        return <Navigate to="/" replace />;
    }

    return children;
};
