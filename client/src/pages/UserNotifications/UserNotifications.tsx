// import { useEffect } from 'react';
import './UserNotifications.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  // AppDispatch,
   RootState } from '../../store/store';
import ErrorDisplay from '../../components/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import { formatDistance } from 'date-fns';
// import { fetchNotificationsThunk } from '../../store/slices/notificationThunks';
// import { useDispatch } from 'react-redux';
const UserNotifications = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading, error, user } = useSelector(
    (state: RootState) => state.user
  );

  // useEffect(() => {
  //   dispatch(fetchNotificationsThunk());
  // }, [dispatch]);

  return (
    <div className="notf_page">
      <div className="notf_hdr">
        <h2>Notifications</h2>
      </div>
      <div className="notf_contnt">
        {loading ? (
          <GridLoader
            color="#329e00"
            margin={30}
            size={55}
            className="notf_loading"
          />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : notifications && notifications.length > 0 ? (
          <div>
            <ul className="notf_list">
              {notifications.map((notification) => {
                const isOwner = notification.propertyOwnerId === user?._id;
                return (
                  <li key={notification._id} className="notf_item">
                    <span className="notf_date">
                      {formatDistance(
                        new Date(notification.createdAt),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                    </span>
                    <div className="notf_detail">
                      <Link
                        to={`/property-detail/${notification.idOfProperty}`}
                        className="notf_img"
                      >
                        <img
                          src={notification.propertyImage}
                          alt={notification.addressOfTour}
                        />
                      </Link>
                      <div>
                        <h3 className="notf_ttl">{notification.title}</h3>
                        <p className="notf_msg">{notification.message}</p>
                      </div>
                    </div>
                    <Link
                      className="view_tour_detail_link"
                      to={`${
                        isOwner
                          ? '/manage-properties/tour-requests'
                          : '/tour-schedules'
                      }`}
                    >
                      View Tour Detail
                    </Link>
                    <button className="mark_read_btn">Mark as Read</button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="no_notfs">You have No notifications</p>
        )}
      </div>
    </div>
  );
};

export default UserNotifications;
