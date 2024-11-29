import { FaChevronLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import './BackButton.css'
const BackButton = () => {
  return (
    <Link className="back_btn" to={'/'}>
      <FaChevronLeft className="icon_left" />
      <span className="btn_txt">Back</span>
    </Link>
  );
};

export default BackButton;
