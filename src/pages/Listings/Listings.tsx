import { useEffect, useState } from 'react';
import PropertySlider from '../../components/PropertySlider/PropertySlider';
import { PROPERTIESDATA } from '../../propertiesData';
import './Listings.css';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton/LoadingSkeleton';

const Listings = () => {
  const [loading, setLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const categories = Array.from(
        new Set(PROPERTIESDATA.map((property) => property.category))
      );
      setUniqueCategories(categories);
      setLoading(false)
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="all_listings">
      {loading ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : (
        uniqueCategories.map((category) => (
          <PropertySlider
            key={category}
            title={category}
            propertyCategory={category}
          />
        ))
      )}
    </div>
  );
};

export default Listings;
