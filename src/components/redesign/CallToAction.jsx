import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-dark py-28 md:py-36 px-8 text-center">
      <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-white leading-snug mb-12">
        Every word carries<br />a quiet weight.
      </h2>
      <Link
        to="/"
        className="inline-block px-10 py-4 border border-white/30 rounded-full text-white font-sans text-sm tracking-wide hover:bg-white hover:text-dark transition-all duration-300"
      >
        Start Reading
      </Link>
    </section>
  );
};

export default CallToAction;
