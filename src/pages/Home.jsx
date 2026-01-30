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
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">The Saga</h2>
                            <div className="h-1 w-20 bg-green-500"></div>
                        </div>
                        <a href="/movies" className="text-green-500 hover:text-white transition-colors">View All Movies →</a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {movies.slice(0, 4).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </section>

            <NewsFeed />
        </div>
    );
};

export default Home;
