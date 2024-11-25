interface SliderArrowProps {
  icon: string;
  className?: string;
  onClick?: () => void;
}
const SliderArrow: React.FC<SliderArrowProps> = ({
  icon,
  className,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick}>
      <img src={icon} alt="" />
    </div>
  );
};

export default SliderArrow;
