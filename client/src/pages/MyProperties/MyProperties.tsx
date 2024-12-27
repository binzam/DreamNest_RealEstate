import './MyProperties.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import axios from 'axios';
import DeletePropertyModal from '../../components/DeletePropertyModal/DeletePropertyModal';

const MyProperties = () => {
  const [properties, setProperties] = useState<PropertyDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

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

  const openDeleteModal = (id: string) => {
    setPropertyToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setPropertyToDelete(null);
  };
  return (
    <div className="my_ptys_pge">
      <div>{message && <div className="success-message">{message}</div>}</div>
      <div className="my_ptys_hdr">
        <h1>Your Listings</h1>
        <p>
          Here you can view all the properties you have listed. You can edit or
          delete them as you wish.
        </p>
      </div>
      <div className="my_ptys_contnt">
        <h2>You have listed {properties.length} Properties</h2>
        <div className="my_ptys_grid">
          {properties.length > 0
            ? properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onEdit={handleEdit}
                  onDelete={() => openDeleteModal(property._id)} 
                />
              ))
            : !loading && <p>No properties found.</p>}
        </div>
      </div>
      {loading && <div>Loading properties...</div>}
      {error && <div className="error-message">{error}</div>}
      <DeletePropertyModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDelete(propertyToDelete!)}
      />
    </div>
  );
};

export default MyProperties;
