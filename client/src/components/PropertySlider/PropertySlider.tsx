import Slider from 'react-slick';
import { settingsForProperty as settings } from '../../utils/sliderSetting';
import {
  PropertyDataType,
  PropertySliderProps,
} from '../../types/propertyTypes';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertySlider.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertySlider = ({ title, propertyFor }: PropertySliderProps) => {
  const properties = useSelector(
    (state: RootState) => state.properties.properties
  );
  const filteredProperties = properties.filter(
    (property: PropertyDataType) => property.propertyFor === propertyFor
  );
  
  return (
    <section className="slider_section">

      <h1>{title}</h1>
      <div className="property_slider">
        <Slider {...settings}>
          {filteredProperties?.map((property: PropertyDataType) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PropertySlider;
