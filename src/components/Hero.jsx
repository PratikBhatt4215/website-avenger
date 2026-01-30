import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date('2026-12-18') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Video Background Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <iframe
                    className="w-full h-full object-cover scale-150 pointer-events-none"
                    src="https://www.youtube.com/embed/hA6hldpSTF8?autoplay=1&mute=1&controls=0&loop=1&playlist=hA6hldpSTF8&showinfo=0&modestbranding=1"
                    title="Avengers Doomsday Background"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="relative z-20 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-900 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] mb-6 tracking-tighter"
                >
                    DOOMSDAY
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-2xl mb-12 text-gray-300 font-light tracking-widest uppercase"
                >
                    The End is Near
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
                >
                    {Object.keys(timeLeft).map((interval) => (
                        <div key={interval} className="flex flex-col items-center bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-green-900/30">
                            <span className="text-4xl md:text-6xl font-bold text-white font-mono">
                                {timeLeft[interval] || '0'}
                            </span>
                            <span className="text-sm md:text-base text-green-500 uppercase tracking-wider mt-2">
                                {interval}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
