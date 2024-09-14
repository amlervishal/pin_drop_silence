import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Navigation = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
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
    <nav className="z-10 sticky top-0 flex flex-col items-center px-4 pt-8 pb-8 gap-3 bg-white/60 shadow-lg backdrop-blur-sm bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="">
        <Link to="/" className="font-Logo drop-shadow-md text-2xl md:text-3xl p-4">Pin drop silence</Link>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <h4 className='font-Primary tracking-widest font-extralight drop-shadow-md text-sm md:text-base'>Blogs by Dr.Amrita Vohra</h4>

      </div>
      <div className='flex flex-row justify-around gap-5 mt-3'>
        <Link to="/about" className="font-Primary border-solid border rounded-full border-slate-600 hover:border-rose-500 tracking-widest hover:text-rose-500 text-sm md:text-base px-2 md:px-5 py-0">about</Link>
      {user ? (
        <>
          <span className="mr-4 font-Primary text-center text-sm md:text-base">Welcome, {user.displayName || user.email}!</span>
          {/* {user.email === 'amlervishal@gmail.com' && (
            <Link to="/create" className="bg-green-600 text-white px-4 py-2 rounded-full mr-2">Create Post</Link>
          )} */}
          <button onClick={handleSignOut} className="font-Primary border-solid border rounded-full border-rose-600 hover:border-rose-500 tracking-widest text-rose-600  hover:text-cyan-500 text-sm md:text-base px-2 md:px-5 py-0">sign out</button>
        </>
      ) : (
        <Link to="/signin" className="font-Primary border-solid border rounded-full border-slate-600 hover:border-rose-500 tracking-widest hover:text-rose-500 text-sm md:text-base px-2 md:px-5 py-0">sign in</Link>
      ) 
      }

      </div>

    </nav>
  );
};

export default Navigation;