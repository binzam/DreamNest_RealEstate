import PropertyListing from '../../components/PropertyListing/PropertyListing';
import PropertyCategory from '../../components/PropertyCategory/PropertyCategory';
import Hero from '../../components/Hero/Hero';
import './Home.css';
import Testimonials from '../../components/Testimonials/Testimonials';
import CallToAction from '../../components/CallToAction/CallToAction';
import QuickStats from '../../components/QuickStats/QuickStats';
import NewsletterSignup from '../../components/NewsletterSignup/NewsletterSignup';
import LocationHighlights from '../../components/LocationHighlights/LocationHighlights';
const Home = () => {
  return (
    <>
      <Hero />
      <PropertyCategory />
      <PropertyListing />
      <QuickStats />
      <LocationHighlights />
      <CallToAction />
      <Testimonials />
      <NewsletterSignup />
    </>
  );
};

export default Home;
