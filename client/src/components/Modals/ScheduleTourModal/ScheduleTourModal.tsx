import { useState } from 'react';
import './ScheduleTourModal.css';
import { FaLocationDot, FaXmark } from 'react-icons/fa6';
import { GrScheduleNew } from 'react-icons/gr';
import { AiOutlineSchedule } from 'react-icons/ai';

interface ScheduleTourModalProps {
  propertyImage: string;
  propertyAddress: string;
  propertyId: string;
  onClose: () => void;
}

const ScheduleTourModal = ({
  propertyImage,
  propertyAddress,
  propertyId,
  onClose,
}: ScheduleTourModalProps) => {
  const now = new Date();
  const formattedNow = now.toISOString().slice(0, 16);
  const [dateTime, setDateTime] = useState(formattedNow);
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
        <div className="schedul_pty_address">
          <FaLocationDot />
          <p>{propertyAddress}</p>
        </div>
        <div className="contact_pty_img">
          <img src={propertyImage} alt={propertyAddress} />
        </div>
        <form className="scheduling_form">
          <label className="date_time_label">
            Date & Time of Viewing
            <input
              className="date_time_input"
              type="datetime-local"
              value={dateTime}
              min={formattedNow}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </label>
          {/* <label className="virtual_checkbox_label">
            <input
              className="virtual_checkbox"
              type="checkbox"
              checked={isVirtual}
              onChange={() => setIsVirtual(!isVirtual)}
            />
            Virtual Tour
          </label> */}
          <button
            onClick={handleSchedule}
            type="submit"
            className="schedule_btn"
          >
            Schedule Tour
            <AiOutlineSchedule />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleTourModal;
