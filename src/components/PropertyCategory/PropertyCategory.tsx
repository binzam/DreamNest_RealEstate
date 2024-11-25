import { PROPERTYCATEGORY } from '../../MOCK_DATA';
import { PropertyCategoryType } from '../../types';
import PropertyCategoryBox from './PropertyCategoryBox';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PropertyCategory.css';
import { settings } from '../../utils/sliderSetting';

const PropertyCategory: React.FC = () => {
  return (
    <section className="categories_section">
      <h1 className="category_ttl">Browse Properties</h1>
      <div className="property_categories">
        <Slider {...settings}>
          {PROPERTYCATEGORY.map((property: PropertyCategoryType) => (
            <PropertyCategoryBox key={property.id} property={property} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PropertyCategory;
