/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

// Helper function to truncate text to approximately 100 words
const truncateText = (text, wordLimit = 20) => {
  const words = text.split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

// Helper function to strip HTML tags
const stripHtml = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// eslint-disable-next-line react/prop-types
const Posts = ({ posts, user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post._id} className="border rounded-lg bg-gray-300/30 bg-blend-multiply backdrop:blur-xl">
          
          <div className="flex-col items-center relative">
              <img 
                src={post.imageUrl || '/default-image.jpg'} 
                alt={post.title} 
                className="w-full h-96 object-cover brightness-75 rounded required:"
              />
              <div className='grid justify-items-end absolute top-0 right-0 p-8 '>
                <Link to={`/post/${post._id}`} className="text-white font-Primary text-3xl tracking-wider drop-shadow-sm font-medium hover:underline">
                  {post.title}
                </Link>
                <p className="text-gray-50/75 drop-shadow-lg text-sm font-Primary tracking-wider p-1">{new Date(post.date).toLocaleDateString()}</p>
                {user && (
                  <Link to={`/edit/${post._id}`} className="text-rose-600 drop-shadow-xl hover:underline">
                    Edit
                  </Link>
                )}
              </div>

              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-gray-50 font-Primary text-sm">
                  {truncateText(stripHtml(post.content))}
                </p>
                <Link to={`/post/${post._id}`} className="text-white/60 font-Primary text-sm hover:text-rose-600 mt-2 inline-block">
                  Read more
                </Link>
              </div>

          </div>

        </div>
      ))}
    </div>
  );
};

export default Posts;