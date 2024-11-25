import { Link } from 'react-router-dom';
import './PropertyCategory.css';
import { PropertyCategoryType } from '../../types';

const PropertyCategoryBox: React.FC<{ property: PropertyCategoryType }> = ({
  property,
}) => {
  return (
    <article>
      <Link to={`/`} className="pty_category_link" key={property.id}>
        <div className="pty_catg_info">
          <h3 className="pty_cat_ttl">{property.title}</h3>

          <span className="pty_cat_count">{property.count}</span>
        </div>
        <img src={property.image} alt={`${property.title}`} />
      </Link>
    </article>
  );
};

export default PropertyCategoryBox;
