import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import axios from 'axios';
import { TourType } from '../../types/interface';
import './UserTourSchedule.css';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GrScheduleNew } from 'react-icons/gr';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import { BsSmartwatch } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
const UserTourSchedule = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const focusedTourId = queryParams.get('tourId');
  const [tourSchedules, setTourSchedules] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourSchedules = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get('/tour/schedules');
        setTourSchedules(response.data.tours);
        console.log(response);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.message || 'Failed to load tour schedules'
          );
        } else {
          setError('Failed to load tour schedules');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTourSchedules();
  }, []);
  useEffect(() => {
    if (focusedTourId) {
      const element = document.getElementById(focusedTourId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight_tour');
        // setTimeout(() => element.classList.remove('highlight_tour'), 3000); // Remove highlight_tour after 3 seconds
      }
    }
  }, [focusedTourId]);

  if (loading) return <p>Loading tour schedules...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tour_schedule_page">
      <div className="tour_schd_hdr">
        <div className="tour_schdl_ttl">
          <GrScheduleNew />
          <h2>Tour Schedule</h2>
        </div>
        <div className="tours_sub_ttl">
          <IoMdInformationCircleOutline />
          <p>
            Here you can view all the property tours you scheduled to visit.
            <br /> <strong>Tours are listed closest to farthset</strong>
          </p>
        </div>
      </div>
      <div className="tour_schdl_cntnt">
        {tourSchedules.length === 0 && <p>You have not scheduled any tours.</p>}
        <ul className='tour_schedule_list'>
          {tourSchedules.map((tour) => (
            <li key={tour.tourId} id={tour.tourId} className='tour_schedule_item'>
              <div>
                <div className="tour_address">
                  <FaLocationDot />
                  <Link to={`/property-detail/${tour.propertyId}`}>
                    <FaHome />
                    {tour.addressOfTour}
                  </Link>
                </div>
                <div className="tour_time">
                  <div>
                    <FaCalendarDays /> {tour.dateOfTour}
                  </div>
                  <div>
                    <BsSmartwatch />
                    {tour.timeOfTour}
                  </div>
                </div>
              </div>
              <div className="tour_bottm">
                <div className="tour_status">
                  <IoMdInformationCircleOutline />
                  Tour {tour.status} *{' '}
                  {tour.status === 'Scheduled' && (
                    <small>
                      Waiting for the owner to confirm or cancel the request
                    </small>
                  )}
                  {tour.status === 'Confirmed' && (
                    <small>
                      Visit the property on the provided data & time.
                    </small>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserTourSchedule;
