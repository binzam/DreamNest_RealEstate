import { useState } from 'react';
import ErrorDisplay from '../../../components/ErrorDisplay/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import './TourRequest.css';
import { BiSolidMessageEdit } from 'react-icons/bi';
import TourList from '../../../components/TourList/TourList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import {
  useCancelTourRequest,
  useConfirmTourRequest,
  useFetchTourRequests,
} from '../../../hooks/useTourActions';
import Container from '../../../components/Container/Container';
import { FaCalendarDays } from 'react-icons/fa6';
import BackToTopButton from '../../../components/BackToTopButton/BackToTopButton';
const TourRequest = () => {
  const [loadingTourId, setLoadingTourId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const { data, isLoading, error } = useFetchTourRequests();
  const confirmMutation = useConfirmTourRequest();
  const cancelMutation = useCancelTourRequest();

  const tourRequests = data?.tours || [];
  const tourDates = data?.tourDates || [];
  const handleConfirm = async (tourId: string) => {
    try {
      setLoadingTourId(tourId);
      await confirmMutation.mutateAsync(tourId);
    } catch (error) {
      console.error('Error confirming tour:', error);
    } finally {
      setLoadingTourId(null);
    }
  };
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleCancel = async (tourId: string) => {
    try {
      setLoadingTourId(tourId);
      await cancelMutation.mutateAsync(tourId);
    } catch (error) {
      console.error('Error canceling tour:', error);
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
      ? tourRequests
      : tourRequests.filter(
          (tour: { status: string }) => tour.status === statusFilter
        );
  return (
    <Container>
      {!showCalendar && (
        <button className="caledar_btn" onClick={toggleCalendar}>
          <FaCalendarDays />
          Show Calendar
        </button>
      )}
      <div className="tour_request_cntnt">
        {tourDates.length > 0 && (
          <span className="request_count">
            {tourDates.length}
            <BiSolidMessageEdit />
          </span>
        )}

        {showCalendar && tourDates.length > 0 && (
          <aside className="tour_request_dates">
            <div>
              <button className="caledar_btn hide" onClick={toggleCalendar}>
                {showCalendar ? 'Hide ' : 'Show '}Calendar
              </button>
              <div className="calender_wrapper">
                <div className="calendar_note">
                  {' '}
                  <IoMdInformationCircleOutline />
                  <small>
                    Dates marked in <span> Green </span>are tour requests.
                  </small>
                </div>
                <Calendar
                  tileClassName={({ date, view }) =>
                    view === 'month' &&
                    tourDates.some(
                      (d: { toDateString: () => string }) =>
                        d.toDateString() === date.toDateString()
                    )
                      ? 'highlight'
                      : ''
                  }
                />
              </div>
            </div>
          </aside>
        )}

        {isLoading ? (
          <GridLoader
            color="#13ccbb"
            margin={20}
            size={35}
            className="my_pty_loading"
          />
        ) : error ? (
          <ErrorDisplay message={error.message} />
        ) : tourRequests.length > 0 || filteredTours.length > 0 ? (
          <div className="tours_display">
            <div className="tour_filter_controls">
              <label htmlFor="statusFilter">Filter Requests </label>
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
        <BackToTopButton />
      </div>
    </Container>
  );
};

export default TourRequest;
