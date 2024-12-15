import { FaChevronLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';
const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <button className="back_btn" onClick={handleBackClick}>
      <FaChevronLeft className="icon_left" />
      <span className="btn_txt">Back</span>
    </button>
  );
};

export default BackButton;
