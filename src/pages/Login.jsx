import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (email) {
            // Call the new async login function
            const result = await login(email, isSignUp ? name : '', isSignUp);

            if (result.success) {
                navigate('/');
            } else {
                setError(result.message); // Show "User not found" or "Email exists"
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black bg-[url('https://wallpapers.com/images/hd/avengers-logo-background-1920-x-1080-8s4w4q4q4q4q4q4q.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/90 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-slate-700"
            >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    {isSignUp ? 'NEW RECRUIT' : 'SHIELD ACCESS'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded text-sm text-center font-mono">
                            ⚠️ {error}
                        </div>
                    )}

                    {isSignUp && (
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-green-500 transition-colors"
                                placeholder="Pratik Kumar"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Agent ID / Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="agent@shield.gov"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(22,163,74,0.5)] uppercase flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {isSignUp ? 'Registering...' : 'Authenticating...'}
                            </>
                        ) : (
                            isSignUp ? 'Register Agent' : 'Authorize'
                        )}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError('');
                            }}
                            className="text-gray-400 text-sm hover:text-green-500 underline disabled:opacity-50"
                        >
                            {isSignUp ? 'Already have an ID? Login' : 'New to S.H.I.E.L.D.? Sign Up'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
