import Slider from 'react-slick';
import { settingsForProperty as settings } from '../../utils/sliderSetting';
import { PropertyDataType } from '../../types';
import { PROPERTIESDATA } from '../../propertiesData';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertySlider.css';
interface PropertySliderProps {
  title: string;
  propertyCategory: string;
}
const PropertySlider: React.FC<PropertySliderProps> = ({
  title,
  propertyCategory,
}) => {
  const filteredProperties = PROPERTIESDATA.filter(
    (property: PropertyDataType) => property.category === propertyCategory
  );
  return (
    <section className="slider_section">
      <h1>{title}</h1>
      <div className="property_slider">
        <Slider {...settings}>
          {filteredProperties.map((property: PropertyDataType) => (
            <PropertyCard key={property.id} data={property} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PropertySlider;
