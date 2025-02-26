import './UserTourSchedule.css';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GrScheduleNew } from 'react-icons/gr';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import TourList from '../../components/TourList/TourList';
import { useLocation, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import { useFetchTourSchedules } from '../../hooks/useTourActions';
import { useMemo, useState } from 'react';
import Container from '../../components/Container/Container';
import MessageDisplay from '../../components/MessageDisplay/MessageDisplay';
interface UserTourScheduleProps {
  isAdminView?: boolean;
}

const UserTourSchedule = ({ isAdminView = false }: UserTourScheduleProps) => {
  const { userId, tourId } = useParams<{ userId?: string; tourId?: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [message, setMessage] = useState<string | null>(
     location.state?.message || null
   );
 
  const userEmail = queryParams.get('user-email');
  const {
    data: tourSchedules,
    isLoading,
    isError,
    error,
  } = useFetchTourSchedules(userId);
  const filteredTours = useMemo(() => {
    if (!tourSchedules) return [];
    return tourId
      ? tourSchedules?.filter((tour) => tour.tourId === tourId)
      : tourSchedules;
  }, [tourId, tourSchedules]);
  console.log(tourSchedules);
  return (
    <div className="tour_schedule_page">
      <div className="tour_schd_hdr">
        <Container>
          <div className="tour_schd_hdr_inner">
            <div className="hdr_back_wrap">
              <BackButton className="white" />

              <div className="tour_schdl_ttl">
                <GrScheduleNew />
                <h2>Tour Schedule</h2>
              </div>
            </div>
            <div className="tours_sub_ttl">
              <IoMdInformationCircleOutline />
              {!isAdminView ? (
                <p>
                  Here you can view property tours you scheduled to
                  visit.
                </p>
              ) : (
                <p>
                  Here you can view property tours scheduled by this user.
                  <br />
                  <strong>{userEmail}</strong>
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>
      <MessageDisplay message={message} setMessage={setMessage} />
      {isError && <ErrorDisplay message={error.message} />}
      <Container>
        <div className="tour_schdl_cntnt">
          {isLoading ? (
            <GridLoader
              color="#13ccbb"
              margin={40}
              size={35}
              className="tour_loading"
            />
          ) : filteredTours && filteredTours.length > 0 ? (
            <TourList
              isAdminView={isAdminView}
              tours={filteredTours}
              isOwner={false}
            />
          ) : (
            <p className="tour_zero_msg">
              {isAdminView
                ? 'This user has not scheduled any tours.'
                : 'You have not scheduled any tours.'}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default UserTourSchedule;
