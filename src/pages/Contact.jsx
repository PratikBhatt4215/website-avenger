import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    // PLACEHOLDER: Replace this with the actual Google Web App URL after deployment
    // Example: https://script.google.com/macros/s/AKfycbx.../exec
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending transmission...');

        // Since we don't have the actual script URL yet, we will simulate success 
        // or attempt to fetch if user provided one.
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE') {
            setTimeout(() => {
                setStatus('Transmission Intercepted: Config Missing (Please set Script URL). Simulated Success.');
                setFormData({ name: '', email: '', message: '' });
            }, 1500);
            return;
        }

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                // mode: 'no-cors' is often needed for Google Scripts due to CORS
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            setStatus('Transmission Sent Successfully.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error:', error);
            setStatus('Transmission Failed.');
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-20 container mx-auto px-4 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/80 border border-green-900/50 p-8 md:p-12 rounded-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase">
                    Secure Channel
                </h1>
                <p className="text-gray-400 mb-8 font-mono text-sm">
                    ENCRYPTION LEVEL: VICTOR // DOOMSDAY PROTOCOL
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            If you have information regarding the multiverse threats or wish to apply for the Avengers Initiative, use this secure form.
                            <br /><br />
                            Warning: All communications are monitored by S.H.I.E.L.D.
                        </p>

                        <div className="bg-black/50 p-6 rounded-lg border border-green-900/30">
                            <h3 className="text-green-500 font-bold mb-2 uppercase text-sm">Direct Line</h3>
                            <p className="text-2xl text-white font-mono tracking-wider">1-800-AVENGERS</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-green-500 text-xs font-bold uppercase mb-2 tracking-widest">Codename / Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 text-white p-3 rounded transition-colors outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-green-500 text-xs font-bold uppercase mb-2 tracking-widest">Contact Freq / Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 text-white p-3 rounded transition-colors outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-green-500 text-xs font-bold uppercase mb-2 tracking-widest">Intel / Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 text-white p-3 rounded transition-colors outline-none resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-black font-bold uppercase py-3 rounded tracking-widest transition-all hover:shadow-[0_0_20px_rgba(22,163,74,0.6)]"
                        >
                            Send Transmission
                        </button>

                        {status && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center font-mono text-sm text-green-400 mt-4 border border-green-900/50 p-2 bg-green-900/10"
                            >
                                {status}
                            </motion.div>
                        )}
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
