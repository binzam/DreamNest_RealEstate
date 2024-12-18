import Hero from '../../components/Hero/Hero';
import { Suspense, lazy } from 'react';
import { GridLoader } from 'react-spinners';
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
    <>
      <Hero />
      <Suspense
        fallback={
          <GridLoader
            color="#13ccbb"
            margin={10}
            size={25}
            className="home_loading"
          />
        }
      >
        <PropertyCategory />
        <CallToAction />
        <PropertyListing category="recommended" title="recommended homes" />
        <LocationHighlights />
        <QuickStats />
        <Testimonials />
        <NewsletterSignup />
      </Suspense>
    </>
  );
};

export default Home;
