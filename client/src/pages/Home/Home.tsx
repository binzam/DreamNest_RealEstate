import PropertyListing from '../../components/PropertyListing/PropertyListing';
import PropertyCategory from '../../components/PropertyCategory/PropertyCategory';
import Hero from '../../components/Hero/Hero';
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
      <CallToAction />
      <PropertyListing category="recommended" title="recommended homes" />
      <LocationHighlights />
      <QuickStats />
      <Testimonials />
      <NewsletterSignup />
    </>
  );
};

export default Home;
