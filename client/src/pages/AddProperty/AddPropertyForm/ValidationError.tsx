import '../AddProperty.css'
import { MdWarning } from 'react-icons/md';

const ValidationError = () => {
  return (
    <span className="validation_error">
      <MdWarning />
    </span>
  );
};

export default ValidationError;
