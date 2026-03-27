/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/redesign/Navbar';
import FooterNew from './components/redesign/FooterNew';
import HomePage from './components/redesign/HomePage';
import About from './components/About';
import BlogPreview from './components/BlogPreview';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import SignIn from './components/SignIn';
import Loader from './components/Loader';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import defaultImage from './assets/default-image.png';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-cream text-dark font-sans">Loading...</div>;
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-cream">
          {/* Fixed-width page container */}
          <div className="max-w-[1400px] mx-auto bg-cream shadow-[0_0_60px_rgba(0,0,0,0.06)]">
            <Helmet>
                <title>Pin Drop Silence...</title>
                <meta name="description" content="Blogs by Dr. Amrita Vohra" />
                <meta property="og:title" content="Pin Drop Silence..." />
                <meta property="og:description" content="Blogs by Dr. Amrita Vohra" />
                <meta property="og:image" content={defaultImage} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.origin} />
            </Helmet>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/about" element={<div className="px-8 md:px-16 py-16"><About /></div>} />
                <Route path="/post/:id" element={<div className="px-8 md:px-16 py-16"><BlogPreview user={user} /></div>} />
                <Route path="/signin" element={user ? <Navigate to="/" replace /> : <div className="px-8 md:px-16 py-16"><SignIn /></div>} />
                <Route
                  path="/create"
                  element={user ? <div className="px-8 md:px-16 py-16"><CreatePost /></div> : <Navigate to="/signin" replace />}
                />
                <Route
                  path="/edit/:id"
                  element={user ? <div className="px-8 md:px-16 py-16"><EditPost /></div> : <Navigate to="/signin" replace />}
                />
              </Routes>
            </main>
            <FooterNew />
          </div>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
