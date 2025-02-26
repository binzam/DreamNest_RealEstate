import './AuthLinks.css';
import { Link } from 'react-router-dom';
interface AuthLinksProps {
  className?: string;
}

const AuthLinks = ({ className = '' }: AuthLinksProps) => {
  return (
    <div className={`auth_links ${className}`}>
      <Link className={`login_link ${className}`} to="/login">
        Login
      </Link>
      <Link className={`signup_link ${className}`} to="/signup">
        Sign up
      </Link>
    </div>
  );
};

export default AuthLinks;
