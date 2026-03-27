const topics = [
  'Education',
  'Reflections',
  'Life & Growth',
  'Parenting',
  'Leadership',
  'Reading',
];

const AboutSection = () => {
  return (
    <section className="bg-cream py-20 md:py-32 px-8 md:px-16">
      {/* Large headline */}
      <div className="mb-16 md:mb-20">
        <h2 className="font-serif text-[clamp(40px,6vw,72px)] font-normal leading-tight text-dark">
          Thoughtful{' '}
          <span className="inline-flex items-center mx-2">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>{' '}
          <span className="text-muted">Writing</span>
        </h2>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16">
        {/* Left - Topics */}
        <div>
          <div className="text-[10px] tracking-[3px] uppercase text-muted mb-6">
            Topics
          </div>
          {topics.map((topic, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-border text-[15px] font-sans text-dark"
            >
              <span>{topic}</span>
              <span className="text-border text-xs">◇</span>
            </div>
          ))}
        </div>

        {/* Right - Bio paragraph */}
        <div>
          <p className="text-lg leading-relaxed text-dark font-sans">
            <strong>Dr. Amrita Vohra</strong> writes about life, education, and the quiet moments that shape us.
            With almost 30 years of transformative work in education, she is a passionate educator, researcher,
            and author, currently serving as COO & Director Education at GEMS Education, India.
          </p>
          <p className="text-lg leading-relaxed text-muted font-sans mt-6">
            A PhD in English Literature, a certified Program Leader for Cambridge Professional Development
            Qualifications, and recognized among India's top 100 'Great People Managers' — her writing bridges
            the personal and professional, offering insights rooted in decades of experience across classrooms,
            boardrooms, and the everyday in-between.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
