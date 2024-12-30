import { useEffect, useState } from 'react';
import './Listings.css';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton/LoadingSkeleton';
import {  axiosPublic } from '../../api/axiosInstance';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CategorizedProperty,
  PropertyDataType,
} from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { settingsForProperty as settings } from '../../utils/sliderSetting';

const Listings = () => {
  const [categoriedProperties, setCategoriedProperties] = useState<
    CategorizedProperty[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorizedProperties = async () => {
      try {
        const response = await axiosPublic.get(
          '/properties/list/categorized'
        );
        console.log(response);

        setCategoriedProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorizedProperties();
  }, []);

  if (loading) {
    return (
      <div className="loading_skeletons">
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
      <section className="slider_section">
        {categoriedProperties.map((category) => (
          <div key={category.category} className="property_slider">
            <h1>{category.category.split('-').join(' ')}</h1>
            {category.properties && category.properties.length > 0 && (
              <div>
                <Slider  {...settings}>
                  {category.properties.map((property: PropertyDataType) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </Slider>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Listings;
