import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../api/axiosInstance';
import { UserDataType } from '../../../types/userTypes';
import UserCard from '../../../components/UserCard/UserCard';
import './ManageUsers.css';
import { Loader } from '../../../components/Loader';
const ManageUsers = () => {
  const [users, setUsers] = useState<UserDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [hasListedProperty, setHasListedProperty] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get('/admin/users', {
          params: {
            search: searchQuery,
            role: filterRole,
            sort: sortOrder,
            hasListedProperty: hasListedProperty,
          },
        });
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        setError('Failed to fetch users data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery, filterRole, sortOrder, hasListedProperty]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="manage_usrs">
      <div className="manage_contnet">
        <div className="usr_filters">
          <h1>Manage users</h1>
          <input
            className="usr_search"
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="user_sorters">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'newest' | 'oldest')
              }
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <label>
            <input
              type="checkbox"
              checked={hasListedProperty}
              onChange={(e) => setHasListedProperty(e.target.checked)}
            />
            Show only property owners
          </label>
        </div>
        <div className="usrs_cntnr">
          {loading && <Loader />}
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard user={user} key={user._id} className="shadow" />
            ))
          ) : (
            <div>No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
