import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import { BsSmartwatch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { TourType } from '../../../types/interface';
import { axiosPrivate } from '../../../api/axiosInstance';
import { RootState } from '../../../store/store';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import './TourRequest.css';
import { ImCheckboxChecked } from 'react-icons/im';
const TourRequest = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [tourSchedules, setTourSchedules] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourSchedules = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get('/tour/requests');
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

  const confirmTourRequest = async (tourId: string): Promise<void> => {
    try {
      const response = await axiosPrivate.patch(`/tour/confirm/${tourId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data.message || 'Failed to confirm tour.'
        );
        throw new Error(
          error.response?.data.message || 'Failed to confirm tour.'
        );
      } else {
        console.error('Error confirming tour:', error);
        throw new Error('Error confirming tour.');
      }
    }
  };

  const cancelTourRequest = async (tourId: string): Promise<void> => {
    try {
      const response = await axiosPrivate.patch(`/tour/cancel/${tourId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message || 'Failed to cancel tour.');
        throw new Error(
          error.response?.data.message || 'Failed to cancel tour.'
        );
      } else {
        console.error('Error canceling tour:', error);
        throw new Error('Error canceling tour.');
      }
    }
  };
  const handleConfirm = async (tourId: string) => {
    try {
      await confirmTourRequest(tourId);
      setTourSchedules((prevSchedules) =>
        prevSchedules.map((tour) =>
          tour.tourId === tourId ? { ...tour, status: 'Confirmed' } : tour
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unknown error occurred.');
        }
        setError(error.message);
      } else {
        console.error('An unknown error occurred.');
        setError('An unknown error occurred.');
      }
    }
  };

  const handleCancel = async (tourId: string) => {
    try {
      await cancelTourRequest(tourId);
      setTourSchedules((prevSchedules) =>
        prevSchedules.map((tour) =>
          tour.tourId === tourId ? { ...tour, status: 'Canceled' } : tour
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error('An unknown error occurred.');
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      <div className="tour_request_cntnt">
        {loading ? (
          <GridLoader
            color="#13ccbb"
            margin={40}
            size={35}
            className="my_pty_loading"
          />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : tourSchedules.length > 0 ? (
          <ul className="tour_request_list">
            {tourSchedules.map((tour) => {
              const isOwner = tour.propertyOwnerId === user?._id;
              return (
                <li key={tour.tourId} className="tour_request_item">
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
                  <div className={`tour_status ${tour.status.toLowerCase()}`}>
                    {tour.status === 'Scheduled' && (
                      <>
                        <IoMdInformationCircleOutline />
                        <span>Tour {tour.status}</span>
                        <small>
                          * You need to confirm or cancel this request.
                        </small>
                      </>
                    )}
                    {tour.status === 'Confirmed' && (
                      <>
                        <ImCheckboxChecked />
                        <span>Tour {tour.status}</span>
                        <small>
                          * Be ready to host on the provided date & time.
                        </small>
                      </>
                    )}
                  </div>
                  {isOwner && tour.status === 'Scheduled' && (
                    <div className="tour_action_buttons">
                      <button
                        className="confirm_btn"
                        onClick={() => handleConfirm(tour.tourId)}
                      >
                        Confirm
                      </button>
                      <button
                        className="cancel_btn"
                        onClick={() => handleCancel(tour.tourId)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>You have no tour requests.</p>
        )}
      </div>
    </div>
  );
};

export default TourRequest;
