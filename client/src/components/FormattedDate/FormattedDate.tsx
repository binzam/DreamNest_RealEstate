import React from 'react';
import { formatDistance } from 'date-fns';
import { MdOutlineBrowserUpdated } from 'react-icons/md';
import './FormattedDate.css'
interface FormattedDateProps {
  date: string | Date; 
  prefix?: string;
  showIcon?: boolean;
  className?: string; 
}

const FormattedDate: React.FC<FormattedDateProps> = ({
  date,
  prefix,
  showIcon = false,
  className = '',
}) => {
  return (
    <div className={`formatted_date ${className}`}>
      {showIcon && <MdOutlineBrowserUpdated />}
      {prefix && <span>{prefix} </span>}
      {formatDistance(new Date(date), new Date(), { addSuffix: true })}
    </div>
  );
};

export default FormattedDate;
