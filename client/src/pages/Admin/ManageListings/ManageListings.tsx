import { useNavigate } from 'react-router-dom';
import PropertyList from '../../PropertyList/PropertyList';

const ManageListings = () => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-property/${id}`);
    console.log(id);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
  };
  return (
    <div>
      <PropertyList onEdit={handleEdit} onDelete={handleDelete} adminMode />
    </div>
  );
};

export default ManageListings;
