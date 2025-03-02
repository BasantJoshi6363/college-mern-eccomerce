import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const RegisterUser = () => {
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            registerUser(user);
        }
    }, [isAuthenticated, user]);

    const registerUser = async (userData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name: userData.name,
                email: userData.email,
                image: userData.picture,
                isAdmin: false
            });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return null; // No UI needed here
};

export default RegisterUser;
