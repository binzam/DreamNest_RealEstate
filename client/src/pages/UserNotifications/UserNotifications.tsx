import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import { NotificationType } from '../../types/interface';
import './UserNotifications.css';
import { Link } from 'react-router-dom';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import { BsSmartwatch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
const UserNotifications = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosPrivate.get('/user/notifications');
        console.log(response);

        setNotifications(response.data.notifications);
        console.log(response);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleConfirm = (notificationId: string) => {
    console.log(`Confirming tour for notification ${notificationId}`);
  };

  const handleCancel = (notificationId: string) => {
    console.log(`Canceling tour for notification ${notificationId}`);
  };
  return (
    <div className="notf_page">
      <div className="notf_hdr">
        <h2>Notifications</h2>
      </div>
      <div className="notf_contnt">
        <div>
          <ul className="notf_list">
            {notifications.map((notification) => {
              const isOwner = notification.initiatorId !== user?._id;
              const statusMessage = isOwner
                ? 'You need to confirm or cancel this request.'
                : 'Waiting for the owner to confirm or cancel the request.';

              return (
                <li key={notification._id} className="notf_item">
                  <div className="notf_top">
                    <div>
                      <h3 className="notf_ttl">{notification.title}</h3>
                      <p className="notf_msg">{notification.message}</p>
                    </div>
                    <div>
                      <div className="notf_time">
                        <div>
                          <FaCalendarDays /> {notification.dateOfTour}
                        </div>
                        <div>
                          <BsSmartwatch />
                          {notification.timeOfTour}
                        </div>
                      </div>
                      <div className="notf_address">
                        <FaLocationDot />
                        <Link
                          to={`/property-detail/${notification.idOfProperty}`}
                        >
                          <FaHome />
                          {notification.addressOfTour}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="notf_bottm">
                    <div className="notf_status">
                      <IoMdInformationCircleOutline />{notification.status} *
                      <small>{statusMessage}</small>
                    </div>
                    {isOwner && notification.status === 'Pending' && (
                      <div className="notf_action_buttons">
                        <button
                          className="confirm_btn"
                          onClick={() => handleConfirm(notification._id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="cancel_btn"
                          onClick={() => handleCancel(notification._id)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <button className="mark_read_btn">Mark as Read</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
