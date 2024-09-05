// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { setAuthToken } from './services/api';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import BlogPreview from './components/BlogPreview';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import SignIn from './components/SignIn';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setUser('User'); // Or fetch the actual username if available
    }
  }, []);

  const handleSignIn = (username, token) => {
    setUser(username);
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Navigation user={user} onSignOut={handleSignOut} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:id" element={<BlogPreview user={user} />} />
            <Route 
              path="/create" 
              element={user ? <CreatePost /> : <Navigate to="/signin" replace />} 
            />
            <Route 
              path="/edit/:id" 
              element={user ? <EditPost /> : <Navigate to="/signin" replace />} 
            />
            <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          </Routes>
        </main>
        <Footer user={user} />
      </div>
    </Router>
  );
}

export default App;