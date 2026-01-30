import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Login from './pages/Login';
import Contact from './pages/Contact';
import './index.css';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 border-b border-green-900/30 bg-[var(--primary-color)]/95 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-[var(--text-color)]">
          AVENGERS<span className="text-red-600">.INITIATIVE</span>
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-green-500">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-[var(--text-muted)] hover:text-green-400 font-bold transition-colors text-sm">HOME</Link>
          <Link to="/movies" className="text-[var(--text-muted)] hover:text-green-400 font-bold transition-colors text-sm">ARCHIVES</Link>
          <Link to="/contact" className="text-[var(--text-muted)] hover:text-green-400 font-bold transition-colors text-sm">CLASSIFIED</Link>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold border-2 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              <button onClick={logout} className="text-red-500 hover:text-red-400 font-bold text-sm">LOGOUT</button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded font-bold text-sm transition-colors">
              LOGIN
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-green-900/30 py-4 px-4 flex flex-col space-y-4 shadow-2xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-white hover:text-green-400 font-bold py-2 border-b border-slate-800">HOME</Link>
          <Link to="/movies" onClick={() => setIsOpen(false)} className="text-white hover:text-green-400 font-bold py-2 border-b border-slate-800">ARCHIVES</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-white hover:text-green-400 font-bold py-2 border-b border-slate-800">CLASSIFIED</Link>
          {user ? (
            <>
              <div className="text-green-500 font-mono text-sm py-2">Agent: {user.name}</div>
              <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-500 hover:text-red-400 font-bold text-left py-2">LOGOUT</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="bg-green-600 text-center py-3 rounded font-bold text-white uppercase tracking-widest mt-2">LOGIN</Link>
          )}
        </div>
      )}
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
