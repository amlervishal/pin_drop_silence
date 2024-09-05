/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';
import Posts from './Posts';

// eslint-disable-next-line react/prop-types
const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="">
      <h1 className="text-xl text-center mb-4 font-Logo">Blog Posts</h1>
      {user && (
        <div className="my-8 text-center">
          <Link to="/create" className="bg-rose-600 text-white px-5 py-2 rounded-full">
            Create New Post
          </Link>
        </div>
      )}
      <Posts posts={posts} user={user} />
    </div>
  );
};

export default Home;

{/* <div
  class="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
></div> */}