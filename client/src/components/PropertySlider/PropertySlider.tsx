import Slider from 'react-slick';
import { settingsForProperty as settings } from '../../utils/sliderSetting';
import {
  PropertyDataType,
  PropertySliderProps,
} from '../../types/propertyTypes';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertySlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useFetchProperties } from '../../hooks/useProperties';
import { useMemo } from 'react';
import Container from '../Container/Container';

const PropertySlider = ({ title, propertyFor }: PropertySliderProps) => {
  const { data: properties } = useFetchProperties();
  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    return propertyFor
      ? properties?.filter((property) => property.propertyFor === propertyFor)
      : properties;
  }, [propertyFor, properties]);

  return (
    <section className="slider_section">
      <Container>
        <div className="slider_section_inner">
          <h1>{title}</h1>
          <div className="property_slider">
            <Slider {...settings}>
              {filteredProperties?.map((property: PropertyDataType) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PropertySlider;
