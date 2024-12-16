import './UserListings.css';

const UserListings = () => {
  return (
    <div className="user_lisings_pge">
      <div className="usr_listn_hdr">
        <h2>My Properties</h2>
      </div>
      <div className="user_lisings_contnt">
        <p>You have no listed Properties</p>
        <small>When you list properties it will be shown here</small>
      </div>
    </div>
  );
};

export default UserListings;
