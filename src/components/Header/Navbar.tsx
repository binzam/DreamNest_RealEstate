import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav_list">
        <li>
          <Link className="hdr_nav_link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hdr_nav_link" to="/listings">
            Properties
          </Link>
        </li>
   
       
        <li>
         
         <Link className="hdr_nav_link" to="/">
           Contact Us
         </Link>
       </li>
      
      </ul>
    </nav>
  );
};

export default Navbar;
