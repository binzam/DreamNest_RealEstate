import Navbar from './Navbar';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import MobileNavbar from './MobileNavbar/MobileNavbar';
import { RiUser3Line } from 'react-icons/ri';
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const disableHeaderStickyness =
    location.pathname.startsWith('/listings/for-sale') ||
    location.pathname.startsWith('/listings/rent');
  return (
    <header className={`header ${disableHeaderStickyness ? 'static' : ''}`}>
      <button className="hamburger" onClick={toggleModal}>
        <HiOutlineMenuAlt2 className="icon_hamburger" />
      </button>

      <Link className="logo" to={'/'}>
        DreamNest
      </Link>
      <Navbar />
      <button className="profile_btn">
        <RiUser3Line className="icon_profile" />
      </button>
      {isModalOpen && <MobileNavbar onCloseModal={toggleModal} />}
    </header>
  );
};

export default Header;
