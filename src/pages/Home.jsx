import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import NewsFeed from '../components/NewsFeed';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('/data/movies.json')
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error('Error fetching movies:', err));
    }, []);

    return (
        <div>
            <Hero />

            {/* Movies Section Preview */}
            <section className="py-10 md:py-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-8 md:mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Saga</h2>
                            <div className="h-1 w-20 bg-green-500"></div>
                        </div>
                        <a href="/movies" className="text-green-500 hover:text-white transition-colors text-sm md:text-base font-bold uppercase tracking-wider">
                            View All Archives &rarr;
                        </a>
                    </div>

                    {/* Compact Grid: stack on mobile, grid on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Only show 2 movies on mobile to save scroll space, 4 on desktop */}
                        {movies.slice(0, window.innerWidth < 768 ? 2 : 4).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <div className="md:hidden text-center mt-8">
                        <a href="/movies" className="inline-block bg-slate-800 text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest border border-slate-700">
                            Explore Full Database
                        </a>
                    </div>
                </div>
            </section>

            <NewsFeed />
        </div>
    );
};

export default Home;
