import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('avengers_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Optional: Speak on refresh/re-visit? 
            // The user asked "when user logged in or come to website", so yes.
            // We use a small timeout to ensure voices are loaded

        }
        setLoading(false);
    }, []);

    const login = async (email, name = '', isSignUp = false) => {
        // We do NOT set global loading(true) here because it unmounts the App component
        // causing the Login page (and its error state) to disappear/reset.
        // The Login page handles its own UI loading state.

        try {
            // 1. Prepare data for Google Script
            const payload = {
                action: isSignUp ? 'signup' : 'login',
                email: email,
                name: name
            };

            // 2. Fetch from Backend
            // Note: We use the URL from .env
            const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
                method: 'POST',
                // We use 'text/plain' to avoid CORS preflight complex checks which Google Scripts hate
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            // 3. Handle Script Response
            if (data.success) {
                const user = {
                    email: email,
                    name: isSignUp ? name : data.name // Use returned name on login
                };
                setUser(user);
                localStorage.setItem('avengers_user', JSON.stringify(user));
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Authentication Failed' };
            }

        } catch (error) {
            console.error("Auth Error:", error);
            // Fallback for demo if network fails, or return error
            return { success: false, message: 'Network Error: Check Internet or Script setup.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('avengers_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
