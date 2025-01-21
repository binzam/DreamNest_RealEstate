import './AdminHeader.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { logoutUser, removeUser } from '../../utils/authUtils';
import { logout } from '../../store/slices/userSlice';
import { NavLink } from 'react-router-dom';
import { MdAdminPanelSettings, MdDashboard, MdPayments } from 'react-icons/md';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { HiMiniUsers } from 'react-icons/hi2';
import { IoIosNotifications } from 'react-icons/io';
const AdminHeader = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logout());
    removeUser();
    await logoutUser();
  };
  return (
    <header className="admn_header">
      <NavLink className="logo" to={'/admin'}>
        Admin mode
      </NavLink>
      <nav className="admn_nav">
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
              to={'/admin/transactions'}
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
        <div className="admn_notf_hdr">
          <IoIosNotifications />
        </div>
        <div className="admn_hdr_prfl">
          <MdAdminPanelSettings />
          <div>Admin</div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
