import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import axios from 'axios';
import { TourType } from '../../types/interface';
import './UserTourSchedule.css';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GrScheduleNew } from 'react-icons/gr';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../components/ErrorDisplay';
import TourList from '../../components/TourList/TourList';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
interface UserTourScheduleProps {
  isAdminView?: boolean;
}

const UserTourSchedule = ({ isAdminView = false }: UserTourScheduleProps) => {
  const { userId } = useParams<{ userId?: string }>(); //
  const [tourSchedules, setTourSchedules] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourSchedules = async () => {
      setLoading(true);
      try {
        const endpoint = userId
          ? `/admin/users/${userId}/tour-schedules`
          : '/tour/schedules';
        const response = await axiosPrivate.get(endpoint);
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
  }, [userId]);

  return (
    <div className="tour_schedule_page">
      <div className="tour_schd_hdr">
      <BackButton className='white' />
        <div className="tour_schdl_ttl">
          <GrScheduleNew />
          <h2>Tour Schedule</h2>
        </div>
        <div className="tours_sub_ttl">
          <IoMdInformationCircleOutline />
          {!isAdminView ? (
            <p>
              Here you can view all the property tours you scheduled to visit.
              <br /> <strong>Tours are listed closest to farthset</strong>
            </p>
          ) : (
            <p>
              Here you can view all the property tours scheduled by this user.
            </p>
          )}
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
          <TourList tours={tourSchedules} isOwner={false} />
        ) : (
          <p className="zero_msg">
            {isAdminView
              ? 'This user has not scheduled any tours.'
              : 'You have not scheduled any tours.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserTourSchedule;
