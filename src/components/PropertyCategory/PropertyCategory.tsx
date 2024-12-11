import { PROPERTYCATEGORY } from '../../MOCK_DATA';
import { PropertyCategoryType } from '../../types';
import PropertyCategoryBox from './PropertyCategoryBox';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PropertyCategory.css';

const PropertyCategory = () => {
  return (
    <section className="categories_section">
      <h1 className="category_ttl">Browse Properties</h1>
      <div className="property_categories">
        {PROPERTYCATEGORY.map((property: PropertyCategoryType) => (
          <PropertyCategoryBox key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertyCategory;
