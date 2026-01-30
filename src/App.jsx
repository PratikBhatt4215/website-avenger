import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Login from './pages/Login';
import Contact from './pages/Contact';
import './index.css';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="p-4 border-b border-green-900/30 bg-[var(--primary-color)]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-[var(--text-color)]">
          AVENGERS<span className="text-red-600">.INITIATIVE</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-[var(--text-muted)] hover:text-green-400 font-bold transition-colors">HOME</Link>
          <Link to="/movies" className="text-[var(--text-muted)] hover:text-green-400 font-bold transition-colors">ARCHIVES</Link>
          <Link to="/contact" className="text-[var(--text-muted)] hover:text-green-400 font-bold transition-colors">CLASSIFIED</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-mono text-xs border border-green-500 px-2 py-1 rounded">
                {user.name}
              </span>
              <button onClick={logout} className="text-red-500 hover:text-red-400 font-bold text-sm">LOGOUT</button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded font-bold text-sm transition-colors">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[var(--primary-color)] text-[var(--text-color)] font-sans selection:bg-green-500 selection:text-black">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
