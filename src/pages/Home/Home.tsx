import PropertyListing from '../../components/PropertyListing/PropertyListing';
import PropertyCategory from '../../components/PropertyCategory/PropertyCategory';
import Hero from '../../components/Hero/Hero';
import './Home.css';
const Home = () => {
  return (
    <>
      <Hero />
      <PropertyCategory />
      <PropertyListing />
    </>
  );
};

export default Home;
