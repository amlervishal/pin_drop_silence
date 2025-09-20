/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
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
    return <div>Loading...</div>;
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <Helmet>
              <title>Pin Drop Silence...</title>
              <meta name="description" content="Blogs by Dr. Amrita Vohra" />
              <meta property="og:title" content="Pin Drop Silence..." />
              <meta property="og:description" content="Blogs by Dr. Amrita Vohra" />
              <meta property="og:image" content={defaultImage} />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={window.location.origin} />
          </Helmet>
          <Navigation user={user} />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/about" element={<About />} />
              <Route path="/post/:id" element={<BlogPreview user={user} />} />
              <Route path="/signin" element={user ? <Navigate to="/" replace /> : <SignIn />} />
              <Route
                path="/create"
                element={user ? <CreatePost /> : <Navigate to="/signin" replace />}
              />
              <Route
                path="/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/signin" replace />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;





