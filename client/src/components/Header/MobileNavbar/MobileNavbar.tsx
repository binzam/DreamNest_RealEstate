import { AiFillCloseSquare } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './MobileNavbar.css';
import { MobileNavbarProps } from '../../../types/PropTypes';
import { useUser } from '../../../context/useUser';
import { BsHouseAdd } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa6';
import { logoutUser, removeUser } from '../../../utils/authUtils';
import AuthLinks from '../../AuthLinks/AuthLinks';

const MobileNavbar = ({ onCloseModal }: MobileNavbarProps) => {
  const { state, dispatch } = useUser();
  const { user, isAuthenticated } = state;
  const handleLogout = async () => {
    try {
      await logoutUser();

      removeUser();

      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="nav_modal open">
      <div className="nav_modal_content">
        <nav className="mobile_nav">
          <div className="mobile_nav_hdr">
            <Link to="/" className="mob_logo">
              DreamNest
            </Link>
            <button className="close_side_nav" onClick={onCloseModal}>
              <AiFillCloseSquare className="icon_close_nav" />
            </button>
          </div>
          {isAuthenticated && user && (
            <div className="mob_usr_hdr">
              <Link
                onClick={onCloseModal}
                to="/user-profile"
                className="mob_nav_link usr"
              >
                <div className="mob_usr_img">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="User" />
                  ) : (
                    <div>
                      <FaUser />
                    </div>
                  )}
                </div>
                <div>
                  <p>{user.firstName}</p>
                  <p>
                    <strong>{user.email}</strong>
                  </p>
                </div>
              </Link>
            </div>
          )}
          {!isAuthenticated && <AuthLinks className='mgb' />}
          <div className="mob_nav_links">
            {isAuthenticated && (
              <div>
                <Link
                  onClick={onCloseModal}
                  to="/add-property"
                  className="mob_nav_link"
                >
                  <BsHouseAdd /> Add Property
                </Link>
              </div>
            )}
            <div>
              <Link
                onClick={onCloseModal}
                className="mob_nav_link"
                to={'/properties/sale'}
              >
                Buy
              </Link>
            </div>

            <div>
              <Link
                onClick={onCloseModal}
                className="mob_nav_link"
                to={'/properties/rent'}
              >
                Rent
              </Link>
            </div>
            {isAuthenticated && (
              <>
                <div>
                  <Link
                    onClick={onCloseModal}
                    className="mob_nav_link"
                    to={'/manage-properties'}
                  >
                    My Properties
                  </Link>
                </div>
                <div>
                  <Link
                    onClick={onCloseModal}
                    className="mob_nav_link"
                    to={'/user-profile'}
                  >
                    Profile
                  </Link>
                </div>
              </>
            )}
            <div>
              <Link
                onClick={onCloseModal}
                className="mob_nav_link"
                to={'/listings'}
              >
                Listings
              </Link>
            </div>
            <div>
              <Link onClick={onCloseModal} className="mob_nav_link" to={'/'}>
                Contact us
              </Link>
            </div>
            {isAuthenticated && (
              <div>
                <button className="mob_nav_link logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
