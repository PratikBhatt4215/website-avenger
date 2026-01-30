import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('avengers_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email) => {
        // Simple simulation
        const dummyUser = { email, name: 'S.H.I.E.L.D. Agent' };
        setUser(dummyUser);
        localStorage.setItem('avengers_user', JSON.stringify(dummyUser));
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
