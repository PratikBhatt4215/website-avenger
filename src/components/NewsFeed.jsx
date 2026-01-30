import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio } from 'lucide-react';

const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [displayNews, setDisplayNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/data/news.json?v=${Date.now()}`)
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setDisplayNews(data.slice(0, 4)); // Initial load
                setLoading(false);
            })
            .catch((err) => console.error('Error fetching news:', err));
    }, []);

    // Simulate Live Updates
    useEffect(() => {
        if (news.length === 0) return;

        const interval = setInterval(() => {
            // Randomly pick a news item from the full list to push to top as "Breaking"
            // In a real app, this would fetch from API
            const randomItem = news[Math.floor(Math.random() * news.length)];
            const newUpdate = {
                ...randomItem,
                id: Date.now(), // Generate new ID
                headline: `[UPDATE] ${randomItem.headline}`,
                date: new Date().toLocaleTimeString(),
                type: 'live'
            };

            setDisplayNews(prev => [newUpdate, ...prev].slice(0, 6)); // Keep top 6
        }, 15000); // Update every 15 seconds

        return () => clearInterval(interval);
    }, [news]);

    return (
        <div className="py-20 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black text-white italic tracking-tighter">
                        <span className="text-red-600">DAILY BUGLE</span> NEWS NETWORK
                    </h2>
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600 rounded-full animate-pulse">
                        <Radio size={16} className="text-red-500" />
                        <span className="text-red-500 font-bold font-mono text-sm uppercase">Live Transmissions</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode='popLayout'>
                            {/* Mobile: Show only 1 item. Desktop: Show all 4-6 items */}
                            {displayNews.slice(0, window.innerWidth < 768 ? 2 : 6).map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-slate-800/50 border border-slate-700 p-4 md:p-6 rounded-xl hover:border-green-500/50 transition-colors flex flex-col md:flex-row gap-4 md:gap-6 group"
                                >
                                    <div className="w-full md:w-32 h-48 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                                        <img src={item.image} alt={item.headline} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${item.type === 'alert' ? 'bg-red-900 text-red-200' : 'bg-slate-700 text-gray-300'}`}>
                                                {item.type || 'News'}
                                            </span>
                                            <span className="text-gray-500 text-xs font-mono">{item.date}</span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors leading-tight">{item.headline}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">{item.content}</p>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-green-500 text-sm font-bold hover:text-green-400 transition-colors uppercase tracking-wider"
                                        >
                                            Read Analysis -&gt;
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar / Ticker */}
                    <div className="bg-black/40 border border-slate-800 rounded-xl p-6 h-fit sticky top-24">
                        <h3 className="text-green-500 font-mono font-bold mb-4 flex items-center gap-2">
                            <Activity size={16} />
                            TRENDING TOPICS
                        </h3>
                        <ul className="space-y-4">
                            {['#DoomsdayIsComing', '#WhereIsSpiderMan', '#StarkLegacy', '#MutantRights'].map((tag, i) => (
                                <li key={i} className="flex items-center justify-between text-gray-400 hover:text-white cursor-pointer transition-colors border-b border-gray-800 pb-2">
                                    <span>{tag}</span>
                                    <span className="text-xs text-green-800">{10 + i}K posts</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-black font-bold py-3 rounded uppercase transition-colors">
                            Submit Tip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsFeed;
