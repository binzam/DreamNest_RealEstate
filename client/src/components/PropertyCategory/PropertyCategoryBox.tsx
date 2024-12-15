import { Link } from 'react-router-dom';
import './PropertyCategory.css';
import { PropertyCategoryType } from '../../types';

const PropertyCategoryBox = ({
  property,
}: {
  property: PropertyCategoryType;
}) => {
  return (
    <article className='category_box'>
      <Link
        to={`/listings/${property.categoryName}`}
        className="pty_category_link"
        key={property.id}
      >
        <div className="pty_catg_info">
          <h3 className="pty_cat_ttl">{property.title}</h3>

          <span className="pty_cat_count">{property.count}</span>
        </div>
        <img src={property.image} alt={`${property.title}`} loading="lazy" />
      </Link>
    </article>
  );
};

export default PropertyCategoryBox;
