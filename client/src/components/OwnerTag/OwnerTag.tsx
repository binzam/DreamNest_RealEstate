import { Link } from 'react-router-dom';
import './OwnerTag.css';
import { FaArrowCircleDown } from 'react-icons/fa';
interface OwnerTagProps {
  className?: string;
  label?: string;
  userId?: string;
  isAdmin?: boolean;
}
const OwnerTag = ({ label, className, userId, isAdmin }: OwnerTagProps) => {
  return (
    <div className={`own_pty_tag ${className}`}>
      <FaArrowCircleDown />
      {isAdmin && userId ? (
        <Link to={`/admin/users/${userId}/profile`} className="admin_link">
          View Owner
        </Link>
      ) : (
        label
      )}
    </div>
  );
};

export default OwnerTag;
