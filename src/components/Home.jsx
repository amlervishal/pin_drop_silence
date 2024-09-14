/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';
import Posts from './Posts';

// Function to check if the user's email is allowed to create/edit posts
const isAllowedToEdit = (userEmail) => {
  const allowedEmails = ['amlervishal@gmail.com', 'dramritavohra@gmail.com']; // Replace with your specific Gmail addresses
  return allowedEmails.includes(userEmail);
};

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <h1 className="text-xl text-center drop-shadow mb-4 font-Logo">Blog Posts</h1>
      {user && isAllowedToEdit(user.email) && (
        <div className="my-8 text-center">
          <Link to="/create" className="bg-rose-600 text-white font-Primary text-sm px-5 py-2 rounded-full">
            Create New Post
          </Link>
        </div>
      )}
      <Posts posts={posts} user={user} />
    </div>
  );
};

export default Home;