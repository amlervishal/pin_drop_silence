/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ user, onSignOut }) => {
  return (
    <nav className="z-10 sticky top-0 flex flex-col items-center px-4 pt-8 pb-8 gap-3 bg-slate-100/75 shadow-sm backdrop-blur-md ">
        <div className="">
          <Link to="/" className="font-Logo text-2xl md:text-3xl p-4">Pin drop silence...</Link>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>

        <div className='flex flex-row items-center gap-2'>
          <h4 className='font-Primary tracking-widest text-sm md:text-base'>Blogs by Dr.Amrita Vohra</h4>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5.5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>

          <Link to="/about" className="font-Primary border-solid border rounded-full border-slate-600 hover:border-rose-500 tracking-widest hover:text-rose-500 text-sm md:text-base px-5 py-0">about</Link>
        </div>
          {user && (
            <>
              <span className="mr-4 font-Primary text-sm">Welcome, {user}!</span>
              <button onClick={onSignOut} className="text-rose-600 hover:underline border border-rose-600 rounded-full text-sm px-5 py-1">Sign Out</button>
            </>
          )}
      
    </nav>
  );
};

export default Navigation;