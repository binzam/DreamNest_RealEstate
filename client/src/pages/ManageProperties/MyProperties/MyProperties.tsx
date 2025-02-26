import './MyProperties.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PropertyCard from '../../../components/PropertyCard/PropertyCard';
import DeletePropertyModal from '../../../components/Modals/DeletePropertyModal/DeletePropertyModal';
import ErrorDisplay from '../../../components/ErrorDisplay/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import { IoHome } from 'react-icons/io5';
import BackButton from '../../../components/BackButton/BackButton';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import {
  useDeleteProperty,
  useFetchUserProperties,
} from '../../../hooks/useManageProperties';
import { useUser } from '../../../context/useUser';
import MessageDisplay from '../../../components/MessageDisplay/MessageDisplay';
import Container from '../../../components/Container/Container';
import BackToTopButton from '../../../components/BackToTopButton/BackToTopButton';

interface MyPropertiesProps {
  isAdminView?: boolean;
}

const MyProperties = ({ isAdminView = false }: MyPropertiesProps) => {
  const { state } = useUser();
  const { user } = state;
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const adminMode = user?.role === 'admin';
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get('user-email');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState({
    id: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState<string | null>(
    location.state?.message || null
  );

  const {
    data: properties = [],
    isLoading,
    isError,
    error,
  } = useFetchUserProperties(userId);
  const deletePropertyMutation = useDeleteProperty();
  const handleEdit = (id: string) => {
    if (adminMode) {
      navigate(`/admin/edit-property/${id}`);
      return;
    }
    navigate(`/my-properties/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    deletePropertyMutation.mutate(id, {
      onSuccess: () => {
        setMessage('Property deleted successfully');
      },
      onError: (error) => {
        if (error instanceof Error) {
          setMessage(error.message || 'Failed to delete property');
        }
      },
    });
    setIsModalOpen(false);
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
    <div>
      {isAdminView && (
        <div className="admn_view_ptys_hdr">
          <Container>
            <div className="admn_view_ptys_hdr_inner">
              <BackButton className="white" />
              <div>
                <IoMdInformationCircleOutline />
                <p>
                  Here you can view all the properties listed by the user.{' '}
                  <br />
                  <strong>{userEmail}</strong>
                </p>
              </div>
            </div>
          </Container>
        </div>
      )}
      <MessageDisplay message={message} setMessage={setMessage} />
      <Container>
        <div className="my_pts_cntnt">
          {isError && <ErrorDisplay message={error.message} />}
          {properties && properties.length > 0 && (
            <span className="my_pty_count">
              {properties.length}
              <IoHome />
            </span>
          )}
          {isLoading ? (
            <GridLoader
              color="#13ccbb"
              margin={20}
              size={35}
              className="my_pty_loading"
            />
          ) : properties.length > 0 ? (
            <div className="my_ptys_grid">
              {properties.map((property) => (
                <PropertyCard
                  adminMode={isAdminView}
                  key={property._id}
                  property={property}
                  onEdit={handleEdit}
                  onDelete={() =>
                    openDeleteModal(property._id, property.photos[0].image)
                  }
                />
              ))}
            </div>
          ) : !isAdminView ? (
            <Link className="add_pty_link" to="/add-property">
              Add Property
            </Link>
          ) : (
            <p className="zero_msg">This user has not listed any propeties.</p>
          )}
          <BackToTopButton />
        </div>
        <DeletePropertyModal
          removeType="property"
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => handleDelete(propertyToDelete.id)}
          imageUrl={propertyToDelete.imageUrl}
        />
      </Container>
    </div>
  );
};

export default MyProperties;
