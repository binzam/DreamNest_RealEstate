import { AiFillCloseSquare } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './MobileNavbar.css';

interface MobileNavbarProps {
  onCloseModal: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ onCloseModal }) => {
  return (
    <div className="nav_modal open">
      <div className="nav_modal_content">
        <nav className="mobile_nav">
          <div className="mobile_nav_hdr">
            <Link to="/" className="logo">
              DreamNest
            </Link>
            <button className="close_side_nav" onClick={onCloseModal}>
              <AiFillCloseSquare className="icon_close_nav" />
            </button>
          </div>
          <div className="mob_nav_links">
            <div>
              <Link
                onClick={onCloseModal}
                className="mob_nav_link"
                to={'/listings/sale'}
              >
                Buy
              </Link>
            </div>
            <div>
              <Link onClick={onCloseModal} className="mob_nav_link" to={'/'}>
                Sell
              </Link>
            </div>
            <div>
              <Link
                onClick={onCloseModal}
                className="mob_nav_link"
                to={'/listings/rent'}
              >
                Rent
              </Link>
            </div>
            <div>
              <Link onClick={onCloseModal} className="mob_nav_link" to={'/'}>
                Properties
              </Link>
            </div>
            <div>
              <Link onClick={onCloseModal} className="mob_nav_link" to={'/'}>
                Recommended
              </Link>
            </div>
            <div>
              <Link onClick={onCloseModal} className="mob_nav_link" to={'/'}>
                Contact us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;