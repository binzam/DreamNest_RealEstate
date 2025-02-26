import Hero from '../../components/Hero/Hero';
import { Suspense, lazy, useEffect } from 'react';
import { GridLoader } from 'react-spinners';
import { PropertyFilterProvider } from '../../context/PropertyFilterContext';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';
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
  useEffect(() => {
    import('../../components/Hero/Hero');
  }, []);
  return (
    <>
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
        <PropertyFilterProvider>
          <Hero />
          <PropertyListing />
          <PropertyCategory />
        </PropertyFilterProvider>

        <CallToAction />
        <LocationHighlights />
        <QuickStats />
        <Testimonials />
        <NewsletterSignup />
        <BackToTopButton />
      </Suspense>
    </>
  );
};

export default Home;
