import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import axios from 'axios';
import { TourType } from '../../types/interface';

const UserTourSchedule = () => {
  const [tourSchedules, setTourSchedules] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourSchedules = async () => {
      try {
        const response = await axiosPrivate.get('/tour/schedules');
        setTourSchedules(response.data.tours);
        setLoading(false);
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
        setLoading(false);
      }
    };

    fetchTourSchedules();
  }, []);

  if (loading) return <p>Loading tour schedules...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tour-schedule-list">
      <h2>Your Scheduled Tours</h2>
      {tourSchedules.length === 0 ? (
        <p>You have no scheduled tours.</p>
      ) : (
        <ul>
          {tourSchedules.map((tour) => (
            <li key={tour.tourId}>
              <h3>{tour.propertyTitle}</h3>
              <p>{tour.propertyAddress.street}</p>
              <p>{new Date(tour.tourDateTime).toLocaleString()}</p>
              <p>Status: {tour.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTourSchedule;
