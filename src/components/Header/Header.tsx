import Navbar from './Navbar';
import './Header.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="header">
      <Link className="logo" to={'/'}>DreamNest</Link>
      <Navbar />

      
    </header>
  );
};

export default Header;
