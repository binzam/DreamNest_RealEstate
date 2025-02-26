import { FaChevronDown, FaChevronUp, FaXmark } from 'react-icons/fa6';
import './FilterButton.css';
interface FilterButtonProps {
  className: string;
  isSelected: boolean;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  clearSelection: (e: React.MouseEvent<HTMLSpanElement>) => void;
  displayText: string;
  title: string;
  ariaLabel?: string;
}
const FilterButton: React.FC<FilterButtonProps> = ({
  className,
  isSelected,
  isDropdownOpen,
  toggleDropdown,
  clearSelection,
  displayText,
  title,
  ariaLabel,
}) => {
  return (
    <button
      className={`${className} ${isSelected ? 'selected' : ''}`}
      onClick={toggleDropdown}
      aria-expanded={isDropdownOpen}
      aria-label={ariaLabel}
      title={title}
    >
      <span className={`${className}_txt ${isDropdownOpen ? 'open' : ''}`}>
        {displayText}
      </span>
      <span className={`${className}_icon`}>
        {isSelected ? (
          <span className={`clear_${className}`} onClick={clearSelection}>
            <FaXmark className="icon_clear" />
          </span>
        ) : isDropdownOpen ? (
          <FaChevronUp />
        ) : (
          <FaChevronDown />
        )}
      </span>
    </button>
  );
};

export default FilterButton;
