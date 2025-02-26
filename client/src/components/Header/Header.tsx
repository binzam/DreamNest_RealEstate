import Navbar from './Navbar';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import MobileNavbar from './MobileNavbar/MobileNavbar';
import { RiUser3Line } from 'react-icons/ri';
import { IoMdNotifications } from 'react-icons/io';
import { MdAdminPanelSettings, MdDashboard } from 'react-icons/md';
import { useFetchNotification } from '../../hooks/useNotifications';
import { useUser } from '../../context/useUser';
import AuthLinks from '../AuthLinks/AuthLinks';
import { FaHeart } from 'react-icons/fa6';
import { GrScheduleNew } from 'react-icons/gr';
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import Container from '../Container/Container';
const Header = () => {
  const { state } = useUser();
  const { user, isAuthenticated } = state;
  const { data: notifications = [] } = useFetchNotification(isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminMode = user?.role === 'admin';
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleAdminMode = () => {
    navigate('/admin');
  };

  const unreadNotifications = notifications.filter(
    (notification) => notification.status !== 'Read'
  );
  const disableHeaderDisplay = location.pathname.startsWith('/property-detail');
  const disableHeaderStickyness = location.pathname.startsWith('/properties');
  const diableNotifcations = location.pathname.startsWith('/notifications');

  return (
    <header
      className={`header ${
        disableHeaderStickyness ? 'static' : disableHeaderDisplay ? 'none' : ''
      }`}
    >
      <Container>
        <div className="header_wrapper">
          <button className="hamburger" onClick={toggleModal}>
            <HiOutlineMenuAlt2 className="icon_hamburger" />
          </button>
          <div className="header_left">
            <div className="logo_wrap_main">
              <Link className="logo" to={`${isAdminMode ? '/admin' : '/'}`}>
                {isAdminMode && <MdAdminPanelSettings />} DreamNest{' '}
              </Link>

              {isAdminMode && (
                <button className="admn_dash_btn" onClick={toggleAdminMode}>
                  <MdDashboard /> <p>Go to Admin dashboard</p>
                </button>
              )}
            </div>
            {isAuthenticated &&
              !diableNotifcations &&
              unreadNotifications &&
              unreadNotifications.length > 0 && (
                <Link
                  to={'/notifications'}
                  className={`hdr_prf_notf ${
                    notifications.length > 0 ? 'new_notification' : ''
                  }`}
                  title="New Notifications"
                >
                  <IoMdNotifications
                    className={`hdr_bell_icon ${
                      notifications.length > 0 ? 'new_notification' : ''
                    }`}
                  />
                  <span className="hdr_notf_count">
                    {unreadNotifications.length}
                  </span>
                </Link>
              )}
          </div>
          <Navbar />
          {isAuthenticated ? (
            <div className="mob_navbar">
              <div>
                <Link
                  to={'/notifications'}
                  className={`mob_nav_hdr_prf_notf`}
                  title="Notifications"
                >
                  <IoMdNotifications
                    className={`hdr_bell_icon`}
                  />
                  <span className="hdr_notf_count">
                    {unreadNotifications.length}
                  </span>
                </Link>
              </div>
              <div className="mob_usr_pr_icon"  onClick={toggleDropdown}>
                {user?.profilePicture ? (
                  <img
                    className="usr_ppic"
                    src={user?.profilePicture}
                    alt="User Profile"
                  />
                ) : (
                  <div>
                    <RiUser3Line />
                  </div>
                )}
              </div>
              {isDropdownOpen && (
                <div className="mob_nav_dd">
                  <Link
                    onClick={toggleDropdown}
                    className="mob_nav_dd_link"
                    to="/user-profile"
                  >
                    <CgProfile />
                    Profile
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="mob_nav_dd_link"
                    to="/notifications"
                  >
                    <div>
                      <IoMdNotifications /> Notifications
                    </div>
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="mob_nav_dd_link"
                    to="/manage-properties"
                  >
                    <FaHome />
                    My Properties
                  </Link>
                  {!isAdminMode && (
                    <Link
                      onClick={toggleDropdown}
                      className="mob_nav_dd_link"
                      to="/wishlist"
                    >
                      <FaHeart />
                      Wishlist
                    </Link>
                  )}

                  {!isAdminMode && (
                    <Link
                      onClick={toggleDropdown}
                      className="mob_nav_dd_link"
                      to="/tour-schedules"
                    >
                      {' '}
                      <GrScheduleNew />
                      Tour Schedules
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="mob_navbar" onClick={toggleDropdown}>
              <button className="mob_usr_pr_icon">
                <RiUser3Line />
              </button>

              {isDropdownOpen && <AuthLinks className="dd" />}
            </div>
          )}
          {isModalOpen && <MobileNavbar onCloseModal={toggleModal} />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
