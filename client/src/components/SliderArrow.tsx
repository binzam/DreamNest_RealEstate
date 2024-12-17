import { SliderArrowProps } from '../types/PropTypes';

const SliderArrow = ({ icon, className, onClick }: SliderArrowProps) => {
  return (
    <div className={className} onClick={onClick}>
      <img src={icon} alt="" />
    </div>
  );
};

export default SliderArrow;
