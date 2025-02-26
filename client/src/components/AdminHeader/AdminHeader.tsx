import './AdminHeader.css';
import { logoutUser, removeUser } from '../../utils/authUtils';
import { Link, NavLink } from 'react-router-dom';
import {
  MdAdminPanelSettings,
  MdDashboard,
  MdNotificationsNone,
  MdPayments,
} from 'react-icons/md';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { HiMiniUsers } from 'react-icons/hi2';
import { FaChevronDown, FaChevronUp, FaUser } from 'react-icons/fa6';
import { useState } from 'react';
import { useUser } from '../../context/useUser';
import Container from '../Container/Container';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
const AdminHeader = () => {
  const { state, dispatch } = useUser();
  const { user } = state;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logoutUser();
    removeUser();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="admn_header">
      <Container>
        <header className="admn_header_inner">
          <button className="admin_hamburger" onClick={toggleNav}>
            {isNavOpen ? <IoMdClose />: <HiOutlineMenuAlt2 />}
          </button>

          <Link className="admn_logo" to={'/admin/dashboard'}>
            <div className="admin_badge">
              <MdAdminPanelSettings />
            </div>
            <span className="logo_txt">DreamNest </span>
          </Link>
          <nav className={`admn_nav ${isNavOpen ? 'open' : ''}`}>
            <ul className="admin_nav_links">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'admin_nav_link active' : 'admin_nav_link'
                  }
                  to={'/admin/dashboard'}
                >
                  <MdDashboard />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'admin_nav_link active' : 'admin_nav_link'
                  }
                  to={'/admin/manage-listings'}
                >
                  <BiSolidBuildingHouse />
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'admin_nav_link active' : 'admin_nav_link'
                  }
                  to={'/admin/manage-transactions'}
                >
                  <MdPayments />
                  Transactions
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'admin_nav_link active' : 'admin_nav_link'
                  }
                  to={'/admin/manage-users'}
                >
                  <HiMiniUsers />
                  Users
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="admin_hdr_right">
            <Link to="/admin/notifications">
              <div className="admn_notf_hdr">
                <MdNotificationsNone />
              </div>
            </Link>
            <div className="admn_hdr_prfl" onClick={toggleDropdown}>
              <div className="admn_pp">
                {user?.profilePicture ? (
                  <img
                    className="admn_ppic"
                    src={user?.profilePicture}
                    alt="User Profile"
                  />
                ) : (
                  <div className="admn_pp_placeholder">
                    <FaUser />
                  </div>
                )}
              </div>
              <div className="admn_user_info">
                <p className="admn_name">{user?.firstName}</p>
                <strong>Admin</strong>
              </div>
              <button className="admn_dd_togle">
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            {isDropdownOpen && (
              <div className="admn_dd_menu">
                <Link
                  onClick={toggleDropdown}
                  className="admn_dd_link"
                  to="/admin/profile"
                >
                  Admin Profile
                </Link>
                <Link onClick={toggleDropdown} className="admn_dd_link" to="/">
                  User mode
                </Link>
                <button className="admn_dd_link logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
      </Container>
    </header>
  );
};

export default AdminHeader;
