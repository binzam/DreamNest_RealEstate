// import PropertyListing from '../../components/PropertyListing/PropertyListing';
// import PropertyCategory from '../../components/PropertyCategory/PropertyCategory';
// import Hero from '../../components/Hero/Hero';
// import Testimonials from '../../components/Testimonials/Testimonials';
// import CallToAction from '../../components/CallToAction/CallToAction';
// import QuickStats from '../../components/QuickStats/QuickStats';
// import NewsletterSignup from '../../components/NewsletterSignup/NewsletterSignup';
// import LocationHighlights from '../../components/LocationHighlights/LocationHighlights';
import { Suspense, lazy } from 'react';
import { GridLoader } from 'react-spinners';
// Lazy load the components
const Hero = lazy(() => import('../../components/Hero/Hero'));
const PropertyCategory = lazy(
  () => import('../../components/PropertyCategory/PropertyCategory')
);
const PropertyListing = lazy(
  () => import('../../components/PropertyListing/PropertyListing')
);
const Testimonials = lazy(
  () => import('../../components/Testimonials/Testimonials')
);
const CallToAction = lazy(
  () => import('../../components/CallToAction/CallToAction')
);
const QuickStats = lazy(() => import('../../components/QuickStats/QuickStats'));
const NewsletterSignup = lazy(
  () => import('../../components/NewsletterSignup/NewsletterSignup')
);
const LocationHighlights = lazy(
  () => import('../../components/LocationHighlights/LocationHighlights')
);

const Home = () => {
  return (
    <Suspense fallback={<GridLoader color="#13ccbb" margin={10} size={25} className='home_loading' />}>
      <Hero />
      <PropertyCategory />
      <CallToAction />
      <PropertyListing category="recommended" title="recommended homes" />
      <LocationHighlights />
      <QuickStats />
      <Testimonials />
      <NewsletterSignup />
    </Suspense>
  );
};

export default Home;
