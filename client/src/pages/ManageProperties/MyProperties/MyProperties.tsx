import './MyProperties.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../api/axiosInstance';
import { PropertyDataType } from '../../../types/propertyTypes';
import PropertyCard from '../../../components/PropertyCard/PropertyCard';
import axios from 'axios';
import DeletePropertyModal from '../../../components/Modals/DeletePropertyModal/DeletePropertyModal';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import { IoHome } from 'react-icons/io5';
// import { IoHome } from 'react-icons/io5';
// import { IoMdInformationCircleOutline } from 'react-icons/io';

const MyProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<PropertyDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState({
    id: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState<string | null>(
    location.state?.message || null
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchUserPropeties = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get('/properties/my-properties');
        console.log(response);
        setProperties(response.data);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          return setError(
            error.response?.data?.message || 'Failed to fetch properties'
          );
        }
        setError('Failed to fetch your properties');
      } finally {
        setLoading(false);
      }
    };
    fetchUserPropeties();
  }, []);
  const handleEdit = (id: string) => {
    navigate(`/my-properties/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axiosPrivate.delete(`/properties/list/${id}/delete`);
      setProperties((prev) => prev.filter((property) => property._id !== id));
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return setError(
          error.response?.data?.message || 'Failed to delete property'
        );
      }
      setError('Failed to delete property');
      setIsModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string, imageUrl: string) => {
    setPropertyToDelete({ id, imageUrl });
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setPropertyToDelete({ id: '', imageUrl: '' });
  };
  return (
    <>
      <div>
        {message && <div className="success-message">{message}</div>}
        {properties && properties.length > 0 && (
          <span className="my_pty_count">
            {properties.length}
            <IoHome />
          </span>
        )}
        {loading ? (
          <GridLoader
            color="#13ccbb"
            margin={40}
            size={35}
            className="my_pty_loading"
          />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : properties.length > 0 ? (
          <div className="my_ptys_grid">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onEdit={handleEdit}
                onDelete={() =>
                  openDeleteModal(property._id, property.photos[0].image)
                }
              />
            ))}
          </div>
        ) : (
          <Link className="add_pty_link" to="/add-property">
            Add Property
          </Link>
        )}
      </div>
      <DeletePropertyModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDelete(propertyToDelete.id)}
        imageUrl={propertyToDelete.imageUrl}
      />
    </>
  );
};

export default MyProperties;