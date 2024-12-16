import { RiUser3Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './Header.css';
import { removeUser } from '../../utils/authUtils';
import { FaUser } from 'react-icons/fa6';
const Navbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    removeUser();
    setIsDropdownOpen(false);
    toggleDropdown()
  };
  return (
    <nav className="navbar">
      <ul className="nav_list">
        <li>
          <Link className="hdr_nav_link" to="/properties/sale">
            Buy
          </Link>
        </li>
        <li>
          <Link className="hdr_nav_link" to="/sell">
            Sell
          </Link>
        </li>

        <li>
          <Link className="hdr_nav_link" to="/properties/rent">
            Rent
          </Link>
        </li>
        <li>
          <Link className="hdr_nav_link" to="/listings">
            Listings
          </Link>
        </li>
      </ul>
      {isAuthenticated ? (
        <div className="hdr_user_profile">
          <button className="hdr_profile_btn" onClick={toggleDropdown}>
            <RiUser3Line className="icon_profile" />
          </button>

          {isDropdownOpen && (
            <div className="profile_dropdown">
              <div className="profile_dropdown_content">
                <div className="prf_dd_hdr">
                  <Link
                    onClick={toggleDropdown}
                    to="/profile"
                    className="usr_pr_dd_user_link"
                  >
                    <div className="usr_pr_dd_icon">
                      {user && user?.profilePicture ? (
                        <img
                          className="usr_ppic"
                          src={user.profilePicture}
                          alt={user.email}
                        />
                      ) : (
                        <div className="center">
                          <FaUser className="icon_avatar" />
                        </div>
                      )}
                    </div>
                    <div className="user_info_wrap">
                      <div className="dd_user_name">{user?.firstName}</div>
                      <div className="dd_user_email">{user?.email}</div>
                    </div>
                  </Link>
                </div>
                <div className="usr_dd_links">
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/profile"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/my-listings"
                  >
                    My Properties
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/settings"
                  >
                    Settings
                  </Link>
                  <button
                    className="usr_dd_link logout_btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="auth_links">
          <Link className="auth_link login_link" to="/login">
            Login
          </Link>
          <Link className="auth_link signup_link" to="/signup">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
