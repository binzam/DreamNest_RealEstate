import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav_list">
        <li>
          <Link className="hdr_nav_link" to="/properties/sale">
            Buy
          </Link>
        </li>
        <li>
          <Link className="hdr_nav_link" to="/listings/sell">
            Sell
          </Link>
        </li>

        <li>
          <Link className="hdr_nav_link" to="/properties/rent">
            Rent
          </Link>
        </li>
        <li>
          <Link className="hdr_nav_link" to="/listings">
            Listings
          </Link>
        </li>
      </ul>
      <div className="auth_links">
        <Link className="auth_link login_link" to="/login">
          Login
        </Link>
        <Link className="auth_link signup_link" to="/signup">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
