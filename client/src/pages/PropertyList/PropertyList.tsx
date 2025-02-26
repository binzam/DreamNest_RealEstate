import { useNavigate, useParams } from 'react-router-dom';
import './PropertyList.css';
import { useCallback, useState } from 'react';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyFilterBar from '../../components/PropertyFilterBar/PropertyFilterBar';
import BackButton from '../../components/BackButton/BackButton';
import SortingControl from '../../components/SortingControl/SortingControl';
import { useSortedProperties } from '../../hooks/useSortedProperties';
import useFilteredProperties from '../../hooks/useFilteredProperties';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { fetchProperties } from '../../api/fetchData';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../context/useUser';
import DeletePropertyModal from '../../components/Modals/DeletePropertyModal/DeletePropertyModal';
import { useDeleteProperty } from '../../hooks/useManageProperties';
import MessageDisplay from '../../components/MessageDisplay/MessageDisplay';
import { usePropertyFilters } from '../../context/usePropertyFilters';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton/LoadingSkeleton';
import Container from '../../components/Container/Container';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';

interface PropertyListProps {
  adminMode?: boolean;
}
const PropertyList: React.FC<PropertyListProps> = ({ adminMode = false }) => {
  const { type } = useParams<{ type: string }>();
  const { state } = useUser();
  const { user } = state;
  const userId = user?._id;
  const {
    data: properties,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });
  const deletePropertyMutation = useDeleteProperty();
  const navigate = useNavigate();

  const [listingType, setListingType] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState({
    id: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState<string | null>(null);

  const openDeleteModal = (id: string, imageUrl: string) => {
    setPropertyToDelete({ id, imageUrl });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPropertyToDelete({ id: '', imageUrl: '' });
  };

  const {
    priceRange,
    bedRoomsRange,
    bathRoomsRange,
    propertyType,
    searchTerm,
    sortParam,
    sortOrder,
  } = usePropertyFilters();

  const filteredProperties = useFilteredProperties(
    properties || [],
    searchTerm,
    {
      type,
      listingType,
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
      bedroomMin: bedRoomsRange.bedroomMin,
      bedroomMax: bedRoomsRange.bedroomMax,
      bathroomMin: bathRoomsRange.bathroomMin,
      bathroomMax: bathRoomsRange.bathroomMax,
      propertyType,
    }
  );
  const sortedProperties = useSortedProperties(
    filteredProperties,
    sortParam,
    sortOrder
  );

  const handleEdit = useCallback(
    (id: string, ownerId: string) => {
      console.log('edit', id);
      if (adminMode || id === userId) {
        navigate(`/admin/edit-property/${id}`);
        return;
      }
      if (userId === ownerId) {
        navigate(`/my-properties/edit/${id}`);
        return;
      }
    },
    [adminMode, navigate, userId]
  );
  const handleDelete = useCallback(
    async (id: string) => {
      deletePropertyMutation.mutate(id, {
        onSuccess: () => {
          setMessage('Property deleted successfully');
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        },
        onError: (error) => {
          if (error instanceof Error) {
            setMessage(error.message || 'Failed to delete property');
          }
        },
      });
      setIsDeleteModalOpen(false);
    },
    [deletePropertyMutation]
  );

  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="property_listing_page">
      {adminMode ? (
        <div className="listing-type-buttons">
          <button
            className={`listing-type-button ${
              listingType === '' ? 'active' : ''
            }`}
            onClick={() => setListingType('')}
          >
            All
          </button>
          <button
            className={`listing-type-button ${
              listingType === 'rent' ? 'active' : ''
            }`}
            onClick={() => setListingType('rent')}
          >
            Rentals
          </button>
          <button
            className={`listing-type-button ${
              listingType === 'sale' ? 'active' : ''
            }`}
            onClick={() => setListingType('sale')}
          >
            For Sale
          </button>
        </div>
      ) : (
        <Container>
          <div className="pty_listing_hdr">
            <BackButton />
            <h2 className="pty_listing_ttl">
              {!type && 'All'} Properties{' '}
              {type ? `for ${type.toUpperCase()}` : ''}
            </h2>
          </div>
        </Container>
      )}

      <PropertyFilterBar
        properties={properties || []}
        type={type || listingType}
      />

      <SortingControl
        type={type || listingType}
        count={filteredProperties.length}
      />
      <MessageDisplay message={message} setMessage={setMessage} />

      <Container>
        <div className="pty_listing_contnt">
          {sortedProperties.length > 0 ? (
            sortedProperties.map((property: PropertyDataType) => (
              <PropertyCard
                key={property._id}
                property={property}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                adminMode={adminMode}
              />
            ))
          ) : (
            <div className="no_properties_found">
              No matching properties found.
            </div>
          )}
        </div>
      </Container>
      <BackToTopButton />
      <DeletePropertyModal
        removeType="property"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDelete(propertyToDelete.id)}
        imageUrl={propertyToDelete.imageUrl}
      />
    </div>
  );
};

export default PropertyList;
