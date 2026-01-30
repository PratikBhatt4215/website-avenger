import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const MovieCard = ({ movie }) => {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-slate-800 rounded-xl overflow-hidden shadow-lg relative group h-[450px]"
        >
            <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">{movie.title}</h3>
                <p className="text-sm text-green-400 font-mono mb-2">
                    Released: {movie.releaseDate}
                </p>
                <p className="text-gray-300 text-sm line-clamp-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {movie.description}
                </p>
                <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
                >
                    <Play size={16} fill="currentColor" /> Watch Trailer
                </a>
            </div>
        </motion.div>
    );
};

export default MovieCard;
