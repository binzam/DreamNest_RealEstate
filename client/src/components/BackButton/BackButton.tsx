import { FaChevronLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';
interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <button className={`back_btn ${className}`} onClick={handleBackClick}>
      <FaChevronLeft className="icon_left" />
      <span className="btn_txt">Back</span>
    </button>
  );
};

export default BackButton;
