import { IoMdInformationCircleOutline } from 'react-icons/io';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './ManageProperties.css';
const ManageProperties = () => {
  const location = useLocation();

  const isMyProperties = location.pathname.includes('my-properties');
  const isTourRequests = location.pathname.includes('tour-requests');

  return (
    <div className="mange_pty_pge">
      <div className="mange_pty_hdr">
        <div className="mange_pty_ttl">Manage your properties</div>
        <div className="mange_pty_sub_ttl">
          <IoMdInformationCircleOutline />

          {isMyProperties ? (
            <p>
              Here you can view all the properties you have listed. <br />
              <strong>You can edit or delete them as you wish.</strong>
            </p>
          ) : isTourRequests ? (
            <p>
              Here you can view all the requested dates to visit your property.
              <br />
              <strong>You can Confirm or Cancel them as you wish.</strong>
            </p>
          ) : (
            <p>
              Here you can view all your Properties and Tour requests for you
              properties.
              <br />
            </p>
          )}
        </div>
      </div>
      <nav className="mange_pty_nav">
        <Link
          to="my-properties"
          className={`mange_nav_link ${isMyProperties ? 'active' : ''}`}
        >
          Your Properties
        </Link>
        <Link
          to="tour-requests"
          className={`mange_nav_link ${isTourRequests ? 'active' : ''}`}
        >
          Tour Requests
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default ManageProperties;
