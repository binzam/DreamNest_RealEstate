import FormattedDate from '../FormattedDate/FormattedDate';
import { RiUser3Line } from 'react-icons/ri';
import './UserCard.css';
import { UserDataType } from '../../types/userTypes';
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: UserDataType;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, className }) => {
  const {
    profilePicture,
    firstName,
    lastName,
    email,
    createdAt,
    propertiesListed,
  } = user;
  return (
    <Link to={`/admin/users/${user._id}/profile`} className={`user_card`}>
      <article className={`user_card ${className}`}>
        {profilePicture ? (
          <img className="usr_pp" src={profilePicture} alt="" />
        ) : (
          <RiUser3Line className="user_pp_icon" />
        )}

        <div>
          <h3>
            {firstName}
            {lastName}
          </h3>
          <p>{email}</p>
        </div>
        <FormattedDate date={createdAt} prefix="Joined" className="req_date" />
        {typeof propertiesListed === 'number' && (
          <p>
            Properties listed: <span>{propertiesListed}</span>
          </p>
        )}
      </article>
    </Link>
  );
};

export default UserCard;
