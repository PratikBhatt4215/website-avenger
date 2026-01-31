import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Maintenance = () => {
    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-4 text-center font-mono">
            <div className="animate-pulse text-red-600 mb-6">
                <ShieldAlert size={80} />
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-red-600 tracking-tighter mb-4 uppercase drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">
                SYSTEM OFFLINE
            </h1>

            <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-lg max-w-lg backdrop-blur-sm">
                <p className="text-red-400 font-bold text-lg mb-2">
                    PROTOCOL: LOCKDOWN
                </p>
                <p className="text-gray-400 text-sm">
                    The Avengers Database is currently undergoing mandatory security maintenance.
                    Access is restricted to Level 10 clearance only.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                    <span className="text-xs text-red-600 font-bold uppercase tracking-widest">
                        Reconnecting...
                    </span>
                </div>
            </div>

            <p className="fixed bottom-8 text-gray-700 text-xs">
                S.H.I.E.L.D. SECURE SERVER // ID: 894-ALPHA
            </p>
        </div>
    );
};

export default Maintenance;
