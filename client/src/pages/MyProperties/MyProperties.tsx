import './MyProperties.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

const MyProperties = () => {
  const [properties, setProperties] = useState<PropertyDataType[]>([]);
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    const fetchUserPropeties = async () => {
      const response = await axiosPrivate.get('/properties/my-properties');
      console.log(response);

      setProperties(response.data);
    };
    fetchUserPropeties();
  }, []);
  return (
    <div className="my_ptys_pge">
      <div>{message && <div className="success-message">{message}</div>}</div>
      {/* {loading && <div>Loading properties...</div>} */}
      {/* {error && <div className="error-message">{error}</div>} */}
        <h3>You have listed {properties.length} Properties</h3>
      <div className="my_ptys_grid">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
