import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/api';

const stripHtml = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const truncateText = (text, wordLimit = 25) => {
  const words = text.split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const categories = ['Reflections', 'Education', 'Life & Growth'];

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts.slice(0, 3));
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="bg-cream px-8 md:px-16 py-16 md:py-24">
      {/* Section header */}
      <div className="flex justify-between items-end mb-12 md:mb-16">
        <div>
          <div className="text-[11px] tracking-[2px] uppercase text-muted mb-2">
            01 / Selected Writing
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-dark">
            Featured Posts
          </h2>
        </div>
        <svg className="w-6 h-6 text-muted hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Featured items */}
      {posts.map((post, index) => {
        const postId = post._id || post.id;
        return (
          <Link to={`/post/${postId}`} key={postId} className="block group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-12 border-t border-border items-center">
              {/* Left - text */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[13px] text-muted font-sans">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-muted">———</span>
                  <span className="text-[11px] tracking-[2px] uppercase text-muted font-sans">
                    {categories[index % categories.length]}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark leading-tight mb-3 group-hover:opacity-70 transition-opacity">
                  {post.title || 'Untitled Post'}
                </h3>
                <p className="text-sm text-muted font-sans leading-relaxed">
                  {truncateText(stripHtml(post.content || 'No content'))}
                </p>
              </div>

              {/* Right - image */}
              <div className="overflow-hidden">
                <img
                  src={post.imageUrl || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80'}
                  alt={post.title}
                  className="w-full h-56 md:h-72 object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </Link>
        );
      })}

      {/* View all CTA */}
      <div className="flex justify-center mt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-dark rounded-full text-[12px] tracking-[2px] uppercase font-sans text-dark hover:bg-dark hover:text-white transition-all duration-300"
        >
          View All Posts
          <span>→</span>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPosts;
