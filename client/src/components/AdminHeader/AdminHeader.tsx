import './AdminHeader.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { logoutUser, removeUser } from '../../utils/authUtils';
import { logout } from '../../store/slices/userSlice';
import { Link } from 'react-router-dom';
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
      <Link className="logo" to={'/admin'}>
        Admin mode
      </Link>
      <nav className="admn_nav">
        <ul className="admin_nav_links">
          <li>
            <Link className="admin_nav_link active" to={'/admin'}>
              <MdDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="admin_nav_link" to={'/admin/manage-listings'}>
              <BiSolidBuildingHouse />
              Properties
            </Link>
          </li>
          <li>
            <Link className="admin_nav_link" to={'/admin'}>
              <MdPayments />
              Transactions
            </Link>
          </li>
          <li>
            <Link className="admin_nav_link" to={'/admin'}>
              <HiMiniUsers />
              Users
            </Link>
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
