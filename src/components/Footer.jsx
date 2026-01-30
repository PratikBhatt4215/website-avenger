import React from 'react';
import { Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-green-900/30 py-8 relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand & Social */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-white mb-2">
                            AVENGERS<span className="text-red-600">.DIARIES</span>
                        </h3>
                        <a
                            href="https://www.instagram.com/avengers.diariess/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors justify-center md:justify-start"
                        >
                            <Instagram size={20} />
                            <span>@avengers.diariess</span>
                        </a>
                    </div>

                    {/* Developer Credits */}
                    <div className="text-center md:text-right">
                        <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest font-mono">Developed By</p>
                        <p className="text-green-500 font-bold text-lg">Pratik Bhatt</p>

                        <div className="mt-4">
                            <p className="text-gray-600 text-xs uppercase tracking-widest mb-1">Squad Team</p>
                            <div className="flex gap-4 justify-center md:justify-end text-sm text-gray-400">
                                <span>Apoorv Trivedi</span>
                                <span className="text-green-900">•</span>
                                <span>Aman Kumar</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-slate-900 text-center text-gray-600 text-xs">
                    &copy; {new Date().getFullYear()} S.H.I.E.L.D. Secure Database. Authorized Personnel Only.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
