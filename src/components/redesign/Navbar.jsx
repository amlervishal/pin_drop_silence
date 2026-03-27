import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-border px-6 md:px-12 py-4">
      <div className="flex justify-between items-center">
        {/* Left nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[12px] tracking-[2px] uppercase text-dark hover:opacity-60 transition-opacity duration-200">
            Blog
          </Link>
          <Link to="/about" className="text-[12px] tracking-[2px] uppercase text-dark hover:opacity-60 transition-opacity duration-200">
            About
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-dark"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Center logo */}
        <Link to="/" className="font-Logo text-lg md:text-xl tracking-wide text-dark">
          Pin drop silence
        </Link>

        {/* Right nav */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <span className="text-[11px] tracking-[1px] uppercase text-muted">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-[12px] tracking-[2px] uppercase text-dark hover:opacity-60 transition-opacity duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/signin" className="text-[12px] tracking-[2px] uppercase text-dark hover:opacity-60 transition-opacity duration-200">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 flex flex-col gap-3 border-t border-border pt-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[2px] uppercase text-dark">Blog</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[2px] uppercase text-dark">About</Link>
          {user ? (
            <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="text-[12px] tracking-[2px] uppercase text-dark text-left">Sign Out</button>
          ) : (
            <Link to="/signin" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[2px] uppercase text-dark">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
