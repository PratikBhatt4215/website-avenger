import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('/data/movies.json')
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error('Error fetching movies:', err));
    }, []);

    const groupedMovies = movies.reduce((acc, movie) => {
        const saga = movie.saga || 'Other';
        const phase = `Phase ${movie.phase}`;

        if (!acc[saga]) acc[saga] = {};
        if (!acc[saga][phase]) acc[saga][phase] = [];

        acc[saga][phase].push(movie);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-black text-center mb-16 text-white tracking-tighter uppercase">
                    MCU <span className="text-red-600">ARCHIVES</span>
                </h1>

                {Object.entries(groupedMovies).map(([saga, phases]) => (
                    <div key={saga} className="mb-20">
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12 border-b-2 border-yellow-600/30 pb-4 inline-block">
                            {saga}
                        </h2>

                        {Object.entries(phases).map(([phase, phaseMovies]) => (
                            <div key={phase} className="mb-16 pl-6 border-l-2 border-slate-800">
                                <h3 className="text-2xl font-bold text-green-500 mb-8 uppercase tracking-widest flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-green-500"></span>
                                    {phase}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {phaseMovies.map((movie) => (
                                        <MovieCard key={movie.id} movie={movie} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
