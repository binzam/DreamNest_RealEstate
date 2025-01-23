import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { axiosPrivate } from '../../api/axiosInstance';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { HiMiniUsers } from 'react-icons/hi2';
import { MdEmail, MdPayments } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import PropertyCardBody from '../../components/PropertyCard/PropertyCardBody';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import UserCard from '../../components/UserCard/UserCard';
import { PropertyDataType } from '../../types/propertyTypes';
import { UserDataType } from '../../types/userTypes';
import { Loader } from '../../components/Loader';

interface DashboardData {
  totalProperties: number;
  totalUsers: number;
  latestProperties: PropertyDataType[];
  latestUsers: UserDataType[];
}

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalProperties: 0,
    totalUsers: 0,
    latestProperties: [],
    latestUsers: [],
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
          latestProperties: response.data.data.latestProperties,
          latestUsers: response.data.data.latestUsers,
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admn_dash_board">
      {loading && <Loader />}
      <div className="dashboard_data stats">
        <div className="stat_item pty">
          <div className="stat_hdr">
            <span>
              <BiSolidBuildingHouse />
            </span>
            <h2>Properties</h2>
          </div>
          <p>{dashboardData.totalProperties}</p>
        </div>

        <div className="stat_item revn">
          <div className="stat_hdr">
            <span>
              <TbReportMoney />
            </span>
            <h2>Revenue</h2>
          </div>
          <p>${dashboardData.totalUsers + 2230}</p>
        </div>
        <div className="stat_item txn">
          <div className="stat_hdr">
            <span>
              <MdPayments />
            </span>
            <h2>Transactions</h2>
          </div>
          <p>{dashboardData.totalUsers}</p>
        </div>
        <div className="stat_item usr">
          <div className="stat_hdr">
            <span>
              <HiMiniUsers />
            </span>
            <h2>Users</h2>
          </div>
          <p>{dashboardData.totalUsers}</p>
        </div>
      </div>
      <div className="dashboard_data new_ptys">
        <div className="dash_ttl">Latest Listings</div>
        <div className="newly_lstd_ptys">
          {dashboardData.latestProperties.map((property) => {
            const {
              _id,
              propertyFor,
              price,
              bed,
              bath,
              sqft,
              address,
              propertyType,
              createdAt,
              currency,
              owner,
            } = property;
            const { city, street, state, longitude, latitude } = address;
            const ownerEmail = typeof owner === 'string' ? owner : owner.email;
            return (
              <div className="new_pty_row" key={_id}>
                <div className="new_pty_row_hdr">
                  <FormattedDate
                    date={createdAt}
                    prefix="Listed"
                    showIcon={true}
                    className="post_date_admn_dash"
                  />
                  <div className="new_pty_lister">
                    by <MdEmail />
                    {ownerEmail}
                  </div>
                </div>
                <div className="new_listed_pty">
                  <MapDisplay
                    longitude={longitude}
                    latitude={latitude}
                    mapSize="xsml"
                  />
                  <PropertyCardBody
                    propertyFor={propertyFor}
                    propertyType={propertyType}
                    bed={bed}
                    bath={bath}
                    sqft={sqft}
                    price={price}
                    currency={currency}
                    city={city}
                    street={street}
                    state={state}
                    className="new_pty no_shadow"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="dashboard_data  new_users">
        <div className="dash_ttl">Newest Users</div>
        <div className="new_users_listing">
          {dashboardData.latestUsers.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>
      </div>

      <div className="dashboard_data transactions">
        <div className="dash_ttl">Transactions</div>
       
        </div>
    </div>
  );
};

export default AdminDashboard;
