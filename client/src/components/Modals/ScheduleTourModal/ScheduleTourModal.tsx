import { useState } from 'react';
import './ScheduleTourModal.css';
import { FaXmark } from 'react-icons/fa6';
import { GrScheduleNew } from 'react-icons/gr';
import { AiOutlineSchedule } from 'react-icons/ai';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface ScheduleTourModalProps {
  propertyId: string;
  onClose: () => void;
}

const ScheduleTourModal = ({ propertyId, onClose }: ScheduleTourModalProps) => {
  const [dateTime, setDateTime] = useState('');
  // const [isVirtual, setIsVirtual] = useState(false);
  console.log(dateTime);

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
        <div className="schedule_hdr">
          <GrScheduleNew />
          <h2 className="scedule_ttl">Schedule Viewing</h2>
        </div>

        <form className="scheduling_form">
          {/* <label className="date_time_label">
            Insert Date and Time
            <input
              className="date_time_input"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </label>
          <label className="virtual_checkbox_label">
            <input
              className="virtual_checkbox"
              type="checkbox"
              checked={isVirtual}
              onChange={() => setIsVirtual(!isVirtual)}
            />
            Virtual Tour
          </label> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Controlled picker" />
          </LocalizationProvider>
          <button
            onClick={handleSchedule}
            type="submit"
            className="schedule_btn"
          >
            Schedule
            <AiOutlineSchedule />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleTourModal;
