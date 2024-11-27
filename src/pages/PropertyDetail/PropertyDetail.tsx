import { useParams } from 'react-router-dom';
import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
import './PropertyDetail.css';
const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const selectedProperty = PROPERTIESDATA.find(
    (property: PropertyDataType) => property.uniqueId === id
  );

  const { street, city, state, country, price, bed, bath, sqft, photos } =
    selectedProperty;

  return (
    <div className="property-detail">
      <h1 className="property-title">
        {street}, {city}, {state}, {country}
      </h1>
      <p className="property-price">Price: ${price.toLocaleString()}</p>
      <p className="property-info">
        {bed} Bed • {bath} Bath • {sqft} Sqft
      </p>
      <div className="property-photos">
        <div className="main-photo">
          <img
            src={photos.find((photo) => photo.title === 'front')?.image}
            alt="Front view"
          />
        </div>

        <div className="small-photos">
          {photos
            .filter((photo) => photo.title !== 'front')
            .map((photo) => (
              <div key={photo.id} className="photo-box">
                <img src={photo.image} alt={photo.title} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
