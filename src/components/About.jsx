/* eslint-disable no-unused-vars */
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import amritaImage from "../assets/amrita.png";

const About = () => {
  const { user, loading } = getAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container flex flex-col items-center gap-8 mx-auto px-4">
      <h1 className="text-center text-xl font-Logo font-bold">About Dr. Amrita Vohra</h1>
      
      <img 
        className="max-w-80 rounded-xl object-cover drop-shadow-lg" 
        src={amritaImage} 
        alt="Dr. Amrita Vohra" 
      />
      
      <p className="px-5 md:px-20 lg:px-64 font-Primary text-sm mb-4">
        Dr Amrita Vohra has been an eminent educationist for the past 23 years. She began her career as a Lecturer for English Literature at Navyug Girls Post Graduate College, Lucknow, where she established the Functional English Department.
        <br /><br />
        Thereafter, she joined Jaipuria Institute of Management and later Amity University as a Lecturer for English, Soft Skills and Business Communication training students from Mass Communication and Management programmes. She also worked for the English and Women's Studies Departments at IT College, Lucknow, where she taught Literature and Feminist Literary Criticism in Post Graduate courses.
        <br /><br />
        {/* ... rest of the biography ... */}
        In her present profile as Head – Professional Development and Quality Assurance with GEMS Education, India, she is leading on Teacher Education and Quality Assurance. She has helped the organization set up new school projects, provided services to managed schools associated with GEMS, developed and re-organized the Policy manuals for GEMS India K-12 schools and provided continuous mentoring and support to School Leadership teams and most importantly teachers. Being a firm believer in Joint practice development and sharing of good practices, she has set up Professional Learning Communities of teachers in GEMS India both offline and online. She is also a certified Program Leader for Cambridge Professional Development Qualifications - PDQS, having designed one year Diploma programmes for in-service teachers and School Leaders. She has also conducted workshops for teachers in small town and village schools of Rajasthan, Uttar Pradesh as well as the DIET Principals in the Southern state of Kerala. During her tenure with GEMS, she has contributed as Acting Principal for GEMS schools at Gurgaon, Bhopal and Karnal to salvage crisis situations. She is a member of the GEMS Global Education team lead by Mr. Tony Little and is a regular contributor to the GEMS India blog.
      </p>
    </div>
  );
};

export default About;