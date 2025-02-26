import { useState } from 'react';
import './UserNotifications.css';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import {
  IoMdNotifications,
} from 'react-icons/io';
import FormattedDate from '../../components/FormattedDate/FormattedDate';
import {
  useFetchNotification,
  useMarkAsRead,
} from '../../hooks/useNotifications';
import { Loader } from '../../components/Loader';
import { useUser } from '../../context/useUser';
import Container from '../../components/Container/Container';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';

const UserNotifications = () => {
  const { state } = useUser();
  const { user, isAuthenticated } = state;
  const [loadingMarkedId, setLoadingMarkedId] = useState<string | null>(null);

  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useFetchNotification(isAuthenticated);
  const { mutate: markAsRead } = useMarkAsRead();

  const handleMarkAsRead = (id: string) => {
    setLoadingMarkedId(id);
    markAsRead(id, {
      onSettled: () => setLoadingMarkedId(null),
    });
  };

  const handleFilter = (selectedFilter: 'all' | 'read' | 'unread') => {
    setFilter(selectedFilter);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'read') return notification.status === 'Read';
    return notification.status !== 'Read';
  });
  if (isLoading) {
    return (
      <GridLoader
        color="#329e00"
        margin={30}
        size={55}
        className="notf_loading"
      />
    );
  }
  return (
    <div className="notf_page">
      <div className="notf_hdr">
        <Container>
          <div className="notf_hdr_inner">
            <h2 className="notf_hdr_ttl">
              <IoMdNotifications />
              Notifications
            </h2>
          </div>
        </Container>
      </div>
      <div className="notf_filter_controls">
        <button
          className={`notf_fltr_btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        <button
          className={`notf_fltr_btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => handleFilter('unread')}
        >
          Unread
        </button>
        <button
          className={`notf_fltr_btn ${filter === 'read' ? 'active' : ''}`}
          onClick={() => handleFilter('read')}
        >
          Read
        </button>
      </div>
      <Container>
        <div className="notf_contnt">
          {isError ? (
            <ErrorDisplay message={error.message} />
          ) : filteredNotifications && filteredNotifications.length > 0 ? (
            <div>
              <ul className="notf_list">
                {filteredNotifications.map((notification) => {
                  const isOwner = notification.propertyOwnerId === user?._id;
                  return (
                    <li key={notification._id} className="notf_item">
                      {loadingMarkedId === notification._id && <Loader />}
                      <FormattedDate
                        date={notification.createdAt}
                        className="notf_date"
                      />
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
                            : `/tour-schedules/${notification.idOfTour}`
                        }`}
                      >
                        View Request Detail
                      </Link>
                      {notification.status !== 'Read' && (
                        <button
                          className="mark_read_btn"
                          onClick={() => handleMarkAsRead(notification._id)}
                          disabled={
                            notification.status === 'Read' ||
                            loadingMarkedId === notification._id
                          }
                        >
                          Mark as Read
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="no_notfs">
              You have No {filter !== 'all' && `${filter}`} notifications
            </p>
          )}
        </div>
      </Container>
      <BackToTopButton />
    </div>
  );
};

export default UserNotifications;
