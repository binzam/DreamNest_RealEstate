import { useState } from 'react';
import UserCard from '../../../components/UserCard/UserCard';
import './ManageUsers.css';
import { useUsers } from '../../../hooks/useUsers';
import ErrorDisplay from '../../../components/ErrorDisplay/ErrorDisplay';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [hasListedProperty, setHasListedProperty] = useState(false);
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useUsers({
    searchQuery,
    filterRole,
    sortOrder,
    hasListedProperty,
  });

  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <div className="manage_usrs">
      <div className="manage_contnet">
        <div className="usr_filters">
          <h2>Manage users</h2>
          <input
            className="usr_search"
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="user_sorters">
            <select
              className="usr_slct"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="usr_slct"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'newest' | 'oldest')
              }
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <label className="usr_chkbox_filter">
            <input
              type="checkbox"
              checked={hasListedProperty}
              onChange={(e) => setHasListedProperty(e.target.checked)}
            />
            Show only property owners
          </label>
        </div>
        <div className="usrs_cntnr">
          {isLoading ? (
            <>
              <Skeleton height={160} width={`${100}%`} />
              <Skeleton height={160} width={`${100}%`} />
              <Skeleton height={160} width={`${100}%`} />
              <Skeleton height={160} width={`${100}%`} />
              <Skeleton height={160} width={`${100}%`} />
              <Skeleton height={160} width={`${100}%`} />
            </>
          ) : users.length > 0 ? (
            users.map((user) => (
              <UserCard user={user} key={user._id} className="shadow" />
            ))
          ) : (
            <p className="no_users_msg">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
