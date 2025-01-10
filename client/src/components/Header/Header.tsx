import Navbar from './Navbar';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import MobileNavbar from './MobileNavbar/MobileNavbar';
import { RiUser3Line } from 'react-icons/ri';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { IoMdNotifications } from 'react-icons/io';
const Header = () => {
  const { notifications } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const location = useLocation();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const unreadNotifications = notifications.filter(
    (notification) => notification.status !== 'Read'
  );
  const disableHeaderDisplay = location.pathname.startsWith('/property-detail');
  const disableHeaderStickyness =
    location.pathname.startsWith('/properties/sale') ||
    location.pathname.startsWith('/properties/rent');
  const diableNotifcations = location.pathname.startsWith('/notifications');
  useEffect(() => {
    if (unreadNotifications.length > 0) {
      setNewNotification(true);
      const timer = setTimeout(() => {
        setNewNotification(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadNotifications]);

  return (
    <header
      className={`header ${
        disableHeaderStickyness ? 'static' : disableHeaderDisplay ? 'none' : ''
      }`}
    >
      <button className="hamburger" onClick={toggleModal}>
        <HiOutlineMenuAlt2 className="icon_hamburger" />
      </button>
      <div className="logo_wrap">
        <Link className="logo" to={'/'}>
          DreamNest{' '}
        </Link>
        {!diableNotifcations &&
          unreadNotifications &&
          unreadNotifications.length > 0 && (
            <Link
              to={'/notifications'}
              className={`hdr_prf_notf ${
                newNotification ? 'new_notification' : ''
              }`}
              title="New Notifications"
            >
              <IoMdNotifications
                className={`hdr_bell_icon ${
                  newNotification ? 'new_notification' : ''
                }`}
              />
              <span className="hdr_notf_count">
                {unreadNotifications.length}
              </span>
            </Link>
          )}
      </div>
      <Navbar />
      <button className="mob_profile_btn">
        <RiUser3Line className="icon_profile" />
      </button>
      {isModalOpen && <MobileNavbar onCloseModal={toggleModal} />}
    </header>
  );
};

export default Header;
