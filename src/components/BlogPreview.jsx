/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Comments from './Comments';
import { Helmet } from 'react-helmet-async';
import { getMetaTags, generateMetaDescription } from '../utils/metaUtils';
import defaultImage from '../assets/default-image.png';

const BlogPreview = ({ user }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const db = getFirestore();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to fetch post');
        console.error('Error fetching post:', err);
      }
    };
    fetchPost();
  }, [id, db]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const metaTags = getMetaTags(post);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="container flex flex-col content-center items-center px-4">
      <Helmet>
        <title>{post.title} | Pin Drop Silence</title>
        <meta name="description" content={metaTags.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={post.imageUrl || metaTags.image} />
        <meta property="og:site_name" content="Pin Drop Silence" />
        <meta property="article:author" content="Dr. Amrita Vohra" />
        <meta property="article:published_time" content={post.createdAt?.toDate()?.toISOString()} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={post.imageUrl || metaTags.image} />

        {/* Additional SEO */}
        <meta name="keywords" content={metaTags.keywords} />
        <meta name="author" content="Dr. Amrita Vohra" />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
  
      <div className=''>
        <img 
          src={post.imageUrl || defaultImage} 
          alt={post.title} 
          className="w-full h-96 object-cover mb-4 rounded-lg brightness-90"
        />
        <div className='flex flex-col items-center'>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="font-Logo text-3xl font-light mt-3">{post.title}</h1>
            <div className="relative">
              <button
                onClick={() => {
                  const url = window.location.href;
                  const shareData = {
                    title: post.title,
                    text: metaTags.description,
                    url: url
                  };

                  // Try native sharing first (mobile devices)
                  if (navigator.share) {
                    navigator.share(shareData).catch(() => {
                      // Fallback to copying
                      copyToClipboard(url);
                    });
                  } else {
                    // Copy to clipboard
                    copyToClipboard(url);
                  }
                }}
                className="mt-3 p-2 text-gray-600 hover:text-rose-600 transition-colors rounded-full hover:bg-gray-100"
                title="Share this post"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
          <p className='font-Primary text-xs py-3'>{post.createdAt?.toDate().toLocaleDateString()}</p>
        </div>
      </div>

      <div
        className="mb-8 md:mx-0 lg:mx-60 md:px-0 lg:px-5 font-Primary prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Comments postId={id} user={user} />
      <div className="flex flex-col justify-between items-center px-5 gap-2">
        <Link to="/" className="text-slate-700 text-xs font-Primary border-solid border rounded-full border-slate-600 hover:border-rose-500 tracking-widest hover:text-rose-500 md:text-base px-5 py-0">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BlogPreview;