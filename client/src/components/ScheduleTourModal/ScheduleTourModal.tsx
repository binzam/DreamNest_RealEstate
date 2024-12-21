import { useState } from 'react';
import './ScheduleTourModal.css';
import { FaXmark } from 'react-icons/fa6';

interface ScheduleTourModalProps {
  propertyId: string;
  onClose: () => void;
}

const ScheduleTourModal = ({ propertyId, onClose }: ScheduleTourModalProps) => {
  const [dateTime, setDateTime] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);

  const handleSchedule = () => {
    alert(`Viewing scheduled for Property ID: ${propertyId} at ${dateTime}`);
    onClose();
  };

  return (
    <div className="schedule_modal">
      <div className="schedule_modal_content">
        <button className="close_button" onClick={onClose}>
          <FaXmark />
        </button>
        <h2>Schedule a Viewing</h2>
        <form className="scheduling_form">
          <label>
            Date and Time:
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={isVirtual}
              onChange={() => setIsVirtual(!isVirtual)}
            />
            Virtual Tour
          </label>
          <button onClick={handleSchedule} type="submit" className='schedule_btn'>
            Schedule Viewing
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleTourModal;
