import { useEffect, useState } from 'react';
import axios from 'axios';
import { TourType } from '../../../types/interface';
import { axiosPrivate } from '../../../api/axiosInstance';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import './TourRequest.css';
import { BiSolidMessageEdit } from 'react-icons/bi';
import TourList from '../../../components/TourList/TourList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const TourRequest = () => {
  const [tourSchedules, setTourSchedules] = useState<TourType[]>([]);
  const [tourDates, setTourDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTourId, setLoadingTourId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    const fetchTourSchedules = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get('/tour/requests');
        setTourSchedules(response.data.tours);
        setTourDates(response.data.tourDates);
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
      setLoadingTourId(tourId);
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
    } finally {
      setLoadingTourId(null);
    }
  };

  const handleCancel = async (tourId: string) => {
    try {
      setLoadingTourId(tourId);

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
    } finally {
      setLoadingTourId(null);
    }
  };

  const getNoToursMessage = () => {
    if (statusFilter === 'All') {
      return 'You have no tour requests.';
    }
    if (statusFilter === 'Scheduled') {
      return 'You have no pending requests.';
    }
    return `You have no ${statusFilter.toLowerCase()} tours.`;
  };
  const filteredTours =
    statusFilter === 'All'
      ? tourSchedules
      : tourSchedules.filter((tour) => tour.status === statusFilter);
  return (
    <div className="tour_request_cntnt">
      {tourDates && tourDates.length > 0 && (
        <span className="request_count">
          {tourDates.length}
          <BiSolidMessageEdit />
        </span>
      )}
      {tourDates.length > 0 && (
        <aside className="tour_request_dates">
          <div>
            <h2>Tour Schedule Calendar</h2>
            <Calendar
              tileClassName={({ date }) =>
                tourDates.some((d) => d === date)
                  ? 'highlight'
                  : ''
              }
            />
          </div>
          {/* <h2>All Tour Request Dates</h2>
          {tourDates.map((date) => (
            <h3 key={date} className="tour_date">
              {date}
            </h3>
          ))} */}
        </aside>
      )}

      {loading ? (
        <GridLoader
          color="#13ccbb"
          margin={40}
          size={35}
          className="my_pty_loading"
        />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : tourSchedules.length > 0 || filteredTours.length > 0 ? (
        <div className="tours_display">
          <div className="tour_filter_controls">
            <label htmlFor="statusFilter">Filter Tours: </label>
            <select
              className="tour_status_filter"
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Scheduled">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
          {filteredTours.length > 0 ? (
            <TourList
              tours={filteredTours}
              isOwner={true}
              handleCancel={handleCancel}
              handleConfirm={handleConfirm}
              loadingTourId={loadingTourId}
            />
          ) : (
            <p className="zero_msg">{getNoToursMessage()}</p>
          )}
        </div>
      ) : (
        <div className="tours_display">
          <p className="zero_msg">You have no tour requests.</p>
        </div>
      )}
    </div>
  );
};

export default TourRequest;
