import { useState } from 'react';
import './ScheduleTourModal.css';
import { FaCalendarDays, FaLocationDot, FaXmark } from 'react-icons/fa6';
import { GrScheduleNew } from 'react-icons/gr';
import { AiOutlineSchedule } from 'react-icons/ai';
import { axiosPrivate } from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { BsSmartwatch } from 'react-icons/bs';
import ErrorDisplay from '../../ErrorDisplay';

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
  const [tourDateTime, setTourDateTime] = useState(formattedNow);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  console.log(tourDateTime);

  const navigate = useNavigate();
  const formattedTourDate = new Date(tourDateTime);
  const formattedTime = formattedTourDate.toLocaleTimeString();
  const formattedDate = formattedTourDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const handleSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setScheduleSuccess(false);
    setLoading(true);
    setError(null);

    if (!tourDateTime || new Date(tourDateTime) <= new Date()) {
      setError('Please select a valid future date and time.');
      setLoading(false);
      return;
    }
    try {
      const response = await axiosPrivate.post('/tour/schedule-tour', {
        propertyId,
        tourDateTime,
      });
      if (response.status === 201) {
        setScheduleSuccess(true);
      }
    } catch (error) {
      console.error('Error scheduling tour:', error);
      setError('Failed to schedule tour. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleViewSchedule = () => {
    navigate('/tour-schedules');
    onClose();
  };
  return (
    <div className="schedule_modal">
      <div className="schedule_modal_content">
        {loading && (
          <GridLoader
            color="#329e00"
            margin={30}
            size={55}
            className="schedule_modal_loading"
          />
        )}
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
        {error && <ErrorDisplay message={error} />}
        {!scheduleSuccess ? (
          <form className="scheduling_form" onSubmit={handleSchedule}>
            <label className="date_time_label">
              Date & Time of Viewing
              <input
                className={`date_time_input ${error ? 'error' : ''}`}
                type="datetime-local"
                value={tourDateTime}
                min={formattedNow}
                onChange={(e) => setTourDateTime(e.target.value)}
              />
            </label>
            <div className="selected_date_time">
              <div>
                <FaCalendarDays />
                {formattedDate}
              </div>
              <div>
                <BsSmartwatch />
                {formattedTime}
              </div>
            </div>
            <button type="submit" className="schedule_btn">
              Schedule Tour
              <AiOutlineSchedule />
            </button>
          </form>
        ) : (
          <div className="schedule_success">
            <h3>Tour Scheduled Successfully!</h3>
            <button onClick={handleViewSchedule}>View tour schedule</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTourModal;
