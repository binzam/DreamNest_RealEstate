import { Link } from 'react-router-dom';
import './NotFound.css';
import { RxCircleBackslash } from 'react-icons/rx';
const NotFound = () => {
  return (
    <div className="page_not_found">
      <h1>
        Page N<RxCircleBackslash />t Found
        
      </h1>
      <Link to="/">
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
