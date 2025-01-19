import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { axiosPrivate } from '../../api/axiosInstance';
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProperties: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosPrivate.get('/admin/dashboard');
        setDashboardData({
          totalProperties: response.data.data.totalProperties,
          totalUsers: response.data.data.totalUsers,
        });
      } catch (error) {
        setError('Failed to fetch dashboard data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admn_dash_board">
      <div className="dashboard_data">
        <div className="stat_item">
          <h2>Total Properties</h2>
          <p>{dashboardData.totalProperties}</p>
        </div>
        <div className="stat_item">
          <h2>Total Users</h2>
          <p>{dashboardData.totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
