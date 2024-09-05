import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../services/api';

const BlogPreview = ({ user }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
      } catch (err) {
        setError('Failed to fetch post');
        console.error('Error fetching post:', err);
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex flex-col content-center items-center px-4">
      <div className=''>
        <img 
          src={post.imageUrl || '/default-image.jpg'} 
          alt={post.title} 
          className="w-full h-96 object-cover mb-4 rounded-lg brightness-90"
        />
        <div className='flex flex-col items-center'>
          <h1 className="font-Logo text-3xl font-light mt-3 mb-3">{post.title}</h1>
          <p className='font-Primary text-xs py-3'>{new Date(post.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div 
        className="mb-8 md:mx-0 lg:mx-60 px-5 md:px-0 lg:px-5 font-Primary prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="flex justify-between items-center px-5 gap-2">
        <Link to="/" className="text-slate-700 text-xs font-Primary  border-solid border rounded-full border-slate-600 hover:border-rose-500 tracking-widest hover:text-rose-500 md:text-base px-5 py-0">
          Back to Home
        </Link>
        {user && (
          <Link 
            to={`/edit/${id}`} 
            className="bg-rose-600 text-xs text-white px-5 py-0 rounded-full hover:bg-blue-600"
          >
            Edit Post
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogPreview;