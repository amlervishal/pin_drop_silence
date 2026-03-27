import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';

const Ticker = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(db, 'comments');
        const querySnapshot = await getDocs(commentsCollection);
        const allComments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort newest first and take latest 10
        allComments.sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return bTime - aTime;
        });

        setComments(allComments.slice(0, 10));
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    fetchComments();
  }, []);

  // Fallback items if no comments yet
  const fallbackItems = [
    'Blogs by Dr. Amrita Vohra',
    'Thoughts on Life & Learning',
    'Education & Leadership',
    'Currently Writing',
  ];

  const tickerItems = comments.length > 0
    ? comments.map(c => {
        const author = c.authorName || 'Reader';
        const text = (c.content || c.text || '').slice(0, 80);
        return `${author}: "${text}${text.length >= 80 ? '...' : ''}"`;
      })
    : fallbackItems;

  // Duplicate for seamless loop
  const tickerContent = [...tickerItems, ...tickerItems].map((item, i) => (
    <span key={i} className="flex items-center shrink-0">
      <span className="text-[12px] tracking-[1px] text-muted font-sans whitespace-nowrap">
        {item}
      </span>
      <span className="mx-6 text-border">•</span>
    </span>
  ));

  return (
    <div className="bg-cream border-y border-border py-3 overflow-hidden">
      <div className="flex animate-marquee">
        {tickerContent}
        {tickerContent}
      </div>
    </div>
  );
};

export default Ticker;
