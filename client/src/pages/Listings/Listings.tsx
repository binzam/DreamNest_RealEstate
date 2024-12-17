import { useEffect, useState } from 'react';
import PropertySlider from '../../components/PropertySlider/PropertySlider';
import './Listings.css';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton/LoadingSkeleton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchProperties } from '../../store/slices/propertySlice';
import { AppDispatch, RootState } from '../../store/store';

const Listings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector((state: RootState) => state.properties);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    // Dispatch action to fetch properties
    dispatch(fetchProperties());
  }, [dispatch]);
  useEffect(() => {
    if (!loading && properties.length > 0) {
      // Extract unique categories from properties once loaded
      const categories = Array.from(
        new Set(properties.map((property) => property.category))
      );
      setUniqueCategories(categories);
    }
  }, [loading, properties]);
  if (loading) {
    return (
      <div className="all_listings">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="all_listings">
      {uniqueCategories.map((category, index) => (
        <PropertySlider
          key={index}
          title={category}
          propertyCategory={category}
        />
      ))}
    </div>
  );
};

export default Listings;
