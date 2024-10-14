/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import BlogPreview from './components/BlogPreview';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import SignIn from './components/SignIn';
import Loader from './components/Loader';
import { Helmet } from 'react-helmet';
import defaultImage from './assets/default-image.png';

// Firebase configuration
const firebaseConfig = {
  // ... my config 
  apiKey: "AIzaSyDkLozmCnPQgugpyfL79_EEF5-CBS1Hl7E",
  authDomain: "pindropsilence-26bda.firebaseapp.com",
  projectId: "pindropsilence-26bda",
  storageBucket: "pindropsilence-26bda.appspot.com",
  messagingSenderId: "641581851451",
  appId: "1:641581851451:web:b023de3c17ac51cccc8d1e",
  measurementId: "G-Y38HTMVGHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
  );
}

export default App;





