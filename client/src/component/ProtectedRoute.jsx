import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated)
    return (
        isAuthenticated ? children : useEffect(() => { navigate("/login") }, [])
    )
}

export default ProtectedRoute