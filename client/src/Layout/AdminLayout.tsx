import { Outlet } from 'react-router-dom';
import './Layout.css'; 
import AdminHeader from '../components/AdminHeader/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="App admin">
      <AdminHeader />
      <main className="main_content admin">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
