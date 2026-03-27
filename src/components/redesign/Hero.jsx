import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/api';

const Hero = () => {
  const [postCount, setPostCount] = useState(0);
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPostCount(posts.length);
        if (posts.length > 0) {
          setLatestPost(posts[0]);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const heroImage = latestPost?.imageUrl || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920&q=80';
  const heroTitle = latestPost?.title || 'Pin Drop Silence';
  const postId = latestPost?._id || latestPost?.id;

  return (
    <section className="relative">
      {/* Main hero layout: image 80%, stats 20% */}
      <div className="flex">
        {/* Hero image area */}
        <div className="relative w-full md:w-[80%] h-[65vh] min-h-[400px] overflow-hidden">
          <img
            src={heroImage}
            alt={heroTitle}
            className="w-full h-full object-cover brightness-[0.55] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            style={{ animation: 'heroZoom 1.5s ease-out forwards' }}
          />

          {/* Title overlay - bottom left */}
          <div className="absolute bottom-12 left-8 md:left-12 max-w-[70%]">
            {postId ? (
              <Link to={`/post/${postId}`}>
                <h1 className="text-[clamp(36px,6vw,80px)] font-extrabold text-white leading-[1.05] tracking-[-0.02em] hover:opacity-90 transition-opacity" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {heroTitle}
                </h1>
              </Link>
            ) : (
              <h1 className="text-[clamp(36px,6vw,80px)] font-extrabold text-white leading-[1.05] tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {heroTitle}
              </h1>
            )}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[10px] tracking-[2px] uppercase text-white/70 font-sans border border-white/30 rounded-full px-3 py-1">Blogs</span>
              <span className="text-[10px] tracking-[2px] uppercase text-white/70 font-sans border border-white/30 rounded-full px-3 py-1">Reflections</span>
            </div>
          </div>
        </div>

        {/* Stats sidebar - 20% width */}
        <div className="hidden md:flex flex-col justify-between items-center w-[20%] bg-cream border-l border-border py-8">
          {/* Stat 1 - Posts */}
          <div className="flex flex-col justify-center items-center px-4 w-full">
            <svg className="w-4 h-4 text-muted mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <div className="font-serif text-3xl font-bold text-dark">{postCount}</div>
            <div className="text-[8px] tracking-[2px] uppercase text-muted font-sans mt-1">Posts Published</div>
          </div>

          <div className="w-10 h-px bg-border" />

          {/* Stat 2 - Experience */}
          <div className="flex flex-col justify-center items-center px-4 w-full">
            <svg className="w-4 h-4 text-muted mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={1} />
              <path strokeLinecap="round" strokeWidth={1} d="M12 6v6l4 2" />
            </svg>
            <div className="font-serif text-3xl font-bold text-dark">30</div>
            <div className="text-[8px] tracking-[2px] uppercase text-muted font-sans mt-1">Years in Education</div>
          </div>

          <div className="w-10 h-px bg-border" />

          {/* Stat 3 - Schools */}
          <div className="flex flex-col justify-center items-center px-4 w-full">
            <svg className="w-4 h-4 text-muted mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l6.16-3.422A12.083 12.083 0 0121 12.75c0 3.314-4.03 6-9 6s-9-2.686-9-6c0-.498.11-.986.32-1.453L12 14z" />
            </svg>
            <div className="font-serif text-3xl font-bold text-dark">100+</div>
            <div className="text-[8px] tracking-[2px] uppercase text-muted font-sans mt-1">Schools Mentored</div>
          </div>

          <div className="w-10 h-px bg-border" />

          {/* Stat 4 - Recognition */}
          <div className="flex flex-col justify-center items-center px-4 w-full">
            <svg className="w-4 h-4 text-muted mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div className="font-serif text-3xl font-bold text-dark">Top 25</div>
            <div className="text-[8px] tracking-[2px] uppercase text-muted font-sans mt-1">Education Leaders</div>
          </div>

          <div className="w-10 h-px bg-border" />

          {/* Stat 5 - Topics */}
          <div className="flex flex-col justify-center items-center px-4 w-full">
            <div className="font-serif text-3xl font-bold text-dark">PhD</div>
            <div className="text-[8px] tracking-[2px] uppercase text-muted font-sans mt-1">English Literature</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
