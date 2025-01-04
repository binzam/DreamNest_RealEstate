import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import axios from 'axios';
import { TourType } from '../../types/interface';
import './UserTourSchedule.css';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GrScheduleNew } from 'react-icons/gr';
// import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
// import { BsSmartwatch } from 'react-icons/bs';
// import { Link } from 'react-router-dom';
// import { FaHome } from 'react-icons/fa';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../components/ErrorDisplay';
import TourList from '../../components/TourList/TourList';
const UserTourSchedule = () => {
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

      {error && <ErrorDisplay message={error} />}
      <div className="tour_schdl_cntnt">
        {loading ? (
          <GridLoader
            color="#13ccbb"
            margin={40}
            size={35}
            className="tour_loading"
          />
        ) : tourSchedules && tourSchedules.length > 0 ? (
          <TourList
            tours={tourSchedules}
            isOwner={false}
          />
        ) : (
          <p className="zero_msg">You have not scheduled any tours.</p>
        )}
      </div>
    </div>
  );
};

export default UserTourSchedule;
