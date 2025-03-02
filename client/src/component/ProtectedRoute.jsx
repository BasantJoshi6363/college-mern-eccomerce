import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth0();
    return (
        isAuthenticated ? children : <Navigate to="/login" replace />
    )
}

export default ProtectedRoute