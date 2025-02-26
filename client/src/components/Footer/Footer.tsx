import { Link } from 'react-router-dom';
import './Footer.css';
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import Container from '../Container/Container';
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        
          <div className="ftr_one">
            <div className="social_links">
              <a href="#">
                <FaFacebook className="ftr_icon" />
              </a>
              <a href="#">
                <FaYoutube className="ftr_icon" />
              </a>
              <a href="#">
                <FaXTwitter className="ftr_icon" />
              </a>
              <a href="#">
                <FaInstagram className="ftr_icon" />
              </a>
              <a href="#">
                <FaPinterest className="ftr_icon" />
              </a>
            </div>
            <nav className="footer_links">
              <div className="link_group">
                <Link className="ftr_nav_link" to="/about">
                  FAQ&apos;s
                </Link>
                <Link className="ftr_nav_link" to="/about">
                  About us
                </Link>
                <Link className="ftr_nav_link" to="/">
                  Book a Call
                </Link>
              </div>
              <div className="link_group">
                <Link className="ftr_nav_link" to="/about">
                  Careers
                </Link>
                <Link className="ftr_nav_link" to="/about">
                  Feedback
                </Link>
                <Link className="ftr_nav_link" to="/">
                  Privacy
                </Link>
                <Link className="ftr_nav_link" to="/">
                  Terms
                </Link>
              </div>
            </nav>
          </div>
          <p>© 2024 DreamNest. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
