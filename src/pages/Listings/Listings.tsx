import { useEffect, useState } from 'react';
import PropertySlider from '../../components/PropertySlider/PropertySlider';
import { PROPERTIESDATA } from '../../propertiesData';
import './Listings.css';
import Loading from '../../components/Loading/Loading';
const Listings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const categories = Array.from(
        new Set(PROPERTIESDATA.map((property) => property.category))
      );
      setUniqueCategories(categories);
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <Loading />; 
  }

  // const uniqueCategories = Array.from(
  //   new Set(PROPERTIESDATA.map((property) => property.category))
  // );
  return (
    <div className="all_listings">
      {uniqueCategories.map((category) => (
        <PropertySlider
          key={category}
          title={category}
          propertyCategory={category}
        />
      ))}
    </div>
  );
};

export default Listings;
