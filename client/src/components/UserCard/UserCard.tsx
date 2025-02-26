import FormattedDate from '../FormattedDate/FormattedDate';
import { RiUser3Line } from 'react-icons/ri';
import './UserCard.css';
import { UserData } from '../../types/userTypes';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { BiSolidBuildingHouse } from 'react-icons/bi';

interface UserCardProps {
  user: UserData;
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
    role,
  } = user;
  return (
    <Link
      to={`/admin/users/${user._id}/profile`}
      className={`user_card_link ${className}`}
    >
      <article
        className={`user_card ${className} ${role === 'admin' && 'admin'}`}
      >
        {role === 'admin' && (
          <div className="admin_tag">
            <p>ADMIN</p>
            <MdAdminPanelSettings />
          </div>
        )}
        {profilePicture ? (
          <img className="usr_pp" src={profilePicture} alt="" />
        ) : (
          <RiUser3Line className="user_pp_icon" />
        )}

        <div>
          <h3>
            <span>{firstName}</span>
            <span>{lastName}</span>
          </h3>
          <p>{email}</p>
        </div>
        <FormattedDate
          date={createdAt}
          prefix="Joined"
          className="btm_right xsml"
        />
        {typeof propertiesListed === 'number' && (
          <div className='usr_pty_count'>
           <span>{propertiesListed}</span>
           <BiSolidBuildingHouse /> 
          </div>
        )}
      </article>
    </Link>
  );
};

export default UserCard;
