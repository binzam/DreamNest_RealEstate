import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { axiosPrivate } from '../../api/axiosInstance';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { HiMiniUsers } from 'react-icons/hi2';
import { MdPayments } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import PropertyCardBody from '../../components/PropertyCard/PropertyCardBody';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import { RiUser3Line } from 'react-icons/ri';
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admn_dash_board">
      <div className="dash_top">
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
          <div className="new_ptys_ttl">Latest Listings</div>
          <div className="newly_lstd_ptys">
            {dashboardData.latestProperties.map((property) => {
              const {
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
              return (
                <div className="new_listed_pty">
                  <div className="col">
                    <FormattedDate
                      date={createdAt}
                      prefix="Posted"
                      showIcon={true}
                      className="post_date_lrg"
                    />
                    <MapDisplay
                      longitude={longitude}
                      latitude={latitude}
                      mapSize="xsml"
                    />
                  </div>
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
                  <div className="new_pty_lister">
                    <h3>Owner</h3>
                    <img src={owner.profilePicture} alt="" />
                    <div>
                      <p>
                        {owner.firstName}
                        {owner.lastName}
                      </p>
                      <p>{owner.email}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="dashboard_data  new_users">
          <div className="new_ptys_ttl">Newest Users</div>
          <div className="new_users_listing">
            {dashboardData.latestUsers.map((user) => (
              <div className="new_user_box">
                {user.profilePicture ? (
                  <img className="usr_pp" src={user.profilePicture} alt="" />
                ) : (
                  <RiUser3Line className="user_pp_icon" />
                )}

                <div>
                  <p>
                    {user.firstName}
                    {user.lastName}
                  </p>
                  <p>{user.email}</p>
                </div>
                <FormattedDate
                  date={user.createdAt}
                  prefix="Joined"
                  className="req_date"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
