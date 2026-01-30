import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            login(email);
            navigate('/');
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
                <h2 className="text-3xl font-bold text-white mb-6 text-center">SHIELD ACCESS</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(22,163,74,0.5)]"
                    >
                        AUTHORIZE
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
