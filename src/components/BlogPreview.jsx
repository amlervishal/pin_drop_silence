/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Comments from './Comments';
import MetaTags from './MetaTags'; // Import the new MetaTags component

const BlogPreview = ({ user }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const db = getFirestore();

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

  // Create a plain text excerpt from the HTML content
  const createExcerpt = (html, maxLength = 160) => {
    const stripped = html.replace(/<[^>]+>/g, '');
    return stripped.length > maxLength ? stripped.slice(0, maxLength) + '...' : stripped;
  };

  const postUrl = `${window.location.origin}/post/${id}`; // Construct the full URL

  return (
    <div className="container flex flex-col content-center items-center px-4">
      <MetaTags
        title={post.title}
        description={createExcerpt(post.content)}
        image={post.imageUrl || '/default-image.jpg'}
        url={postUrl}
      />
  
      <div className=''>
        <img 
          src={post.imageUrl || '/default-image.jpg'} 
          alt={post.title} 
          className="w-full h-96 object-cover mb-4 rounded-lg brightness-90"
        />
        <div className='flex flex-col items-center'>
          <h1 className="font-Logo text-3xl font-light mt-3 mb-3">{post.title}</h1>
          <p className='font-Primary text-xs py-3'>{post.createdAt?.toDate().toLocaleDateString()}</p>
        </div>
      </div>

      <div 
        className="mb-8 md:mx-0 lg:mx-60 px-5 md:px-0 lg:px-5 font-Primary prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Comments postId={id} />
      <div className="flex flex-col justify-between items-center px-5 gap-2">
        <Link to="/" className="text-slate-700 text-xs font-Primary  border-solid border rounded-full border-slate-600 hover:border-rose-500 tracking-widest hover:text-rose-500 md:text-base px-5 py-0">
          Back to Home
        </Link>
        
      </div>
    </div>
  );
};

export default BlogPreview;









// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import Comments from './Comments';

// const BlogPreview = ({ user }) => {
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState('');
//   const { id } = useParams();
//   const db = getFirestore();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const docRef = doc(db, 'posts', id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setPost({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           setError('Post not found');
//         }
//       } catch (err) {
//         setError('Failed to fetch post');
//         console.error('Error fetching post:', err);
//       }
//     };
//     fetchPost();
//   }, [id, db]);

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container flex flex-col content-center items-center px-4">
//       <div className=''>
//         <img 
//           src={post.imageUrl || '/default-image.jpg'} 
//           alt={post.title} 
//           className="w-full h-96 object-cover mb-4 rounded-lg brightness-90"
//         />
//         <div className='flex flex-col items-center'>
//           <h1 className="font-Logo text-3xl font-light mt-3 mb-3">{post.title}</h1>
//           <p className='font-Primary text-xs py-3'>{post.createdAt?.toDate().toLocaleDateString()}</p>
//         </div>
//       </div>

//       <div 
//         className="mb-8 md:mx-0 lg:mx-60 px-5 md:px-0 lg:px-5 font-Primary prose max-w-none" 
//         dangerouslySetInnerHTML={{ __html: post.content }}
//       />
//       <Comments postId={id} />
//       <div className="flex flex-col justify-between items-center px-5 gap-2">
//         <Link to="/" className="text-slate-700 text-xs font-Primary  border-solid border rounded-full border-slate-600 hover:border-rose-500 tracking-widest hover:text-rose-500 md:text-base px-5 py-0">
//           Back to Home
//         </Link>
        
//       </div>
//     </div>
//   );
// };

// export default BlogPreview;