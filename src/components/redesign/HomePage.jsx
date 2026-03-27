import Hero from './Hero';
import Ticker from './Ticker';
import AboutSection from './AboutSection';
import FeaturedPosts from './FeaturedPosts';
import CallToAction from './CallToAction';

const HomePage = ({ user }) => {
  return (
    <div>
      <Hero />
      <Ticker />
      <AboutSection />
      <FeaturedPosts />
      <CallToAction />
    </div>
  );
};

export default HomePage;
