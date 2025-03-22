import React, { createContext, useState, useEffect, memo } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState();
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true); // To handle app initialization
    const navigate = useNavigate();
    const url = "http://localhost:5000";

    // Check if token exists and validate it when the app loads
    const validateToken = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${url}/api/auth/protect`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAdmin(response.data.output.isAdmin)
            setUser(response.data.output);
            setId(response.data.output._id)
        } catch (error) {
            console.error("Token validation failed:", error);
            localStorage.removeItem("authToken"); // Clear invalid token
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        validateToken();
    }, [url]);

    // Login function
    const login = async (email, password) => {
        const data = { email, password };
        try {
            const response = await axios.post(`${url}/api/auth/login`, data);
            const token = response.data.token
            localStorage.setItem("authToken", token);
            setUser(response.data.output);
            <Navigate to={"/"} />
            toast.success(response.data.message);
            navigate("/");
            window.location.reload();
        } catch (error) {
            toast.error("Invalid credentials");
            console.error("Login failed:", error);
        }
    };

    // Register function
    const register = async (fullname, email, password) => {
        const data = { fullname, email, password };
        try {
            const response = await axios.post(`${url}/api/auth/register`, data);
            const { token } = response.data;
            localStorage.setItem("authToken", token);
            setUser({ token });
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            toast.error("Registration failed");
            console.error("Registration error:", error);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("authToken");
        toast.success("loggedout successfully.")
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user,admin, login, logout, loading, register, id }}>
            {children}
        </AuthContext.Provider>
    );
};

