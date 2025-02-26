import './AdminDashboard.css';
import UserCard from '../../components/UserCard/UserCard';
import { Loader } from '../../components/Loader';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import { useDashboardData } from '../../hooks/useDashboardData';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import AdminDashboardStats from './AdminDashboardStats/AdminDashboardStats';
import Slider from 'react-slick';
import { settingsForDashboard as settings } from '../../utils/sliderSetting';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AdminDashboard = () => {
  const { data: dashboardData, isLoading, isError, error } = useDashboardData();
  if (isLoading || !dashboardData) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }
  console.log(dashboardData)
  return (
    <div className="admn_dash_board">
      <div className="dash_top">
        <AdminDashboardStats dashboardData={dashboardData} />
        <div className="dash_new_ptys">
          <div className="dash_ttl_stats">Latest properties</div>
          <div className="dash_pty_slider">
            <Slider {...settings}>
              {dashboardData.latestProperties.map((property) => (
                <PropertyCard
                  adminMode
                  key={property._id}
                  property={property}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="dash_btm">
        <div className="dash_transactions">
          <div className="dash_ttl_stats">Latest Transactions</div>
          <div className="dash_txn_list">
            {dashboardData.latestTransactions.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
        <div className="dash_new_users">
          <div className="dash_ttl_usrs">Newest Users</div>
          <div className="new_users_listing">
            {dashboardData.latestUsers.map((user) => (
              <UserCard user={user} key={user._id} className='dash' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
