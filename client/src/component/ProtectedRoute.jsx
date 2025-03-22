import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Display a loading indicator while verifying authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login page if user is not authenticated
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
