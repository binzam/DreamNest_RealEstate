import './TourList.css';
import { TourType } from '../../types/interface';
import { GridLoader } from 'react-spinners';
import TourItem from './TourItem';
import FormattedDate from '../FormattedDate/FormattedDate';
import { Link } from 'react-router-dom';
import TourStatusMessage from './TourStatusMessage';
interface TourListProps {
  tours: TourType[];
  isOwner: boolean;
  handleCancel?: (tourId: string) => void;
  handleConfirm?: (tourId: string) => void;
  loadingTourId?: string | null;
  isAdminView?: boolean;
}

const TourList: React.FC<TourListProps> = ({
  tours,
  isOwner,
  handleCancel,
  handleConfirm,
  loadingTourId,
  isAdminView,
}) => {
  return (
    <ul className="tour_list">
      {tours.map((tour) => (
        <li key={tour.tourId} className="tour_item">
          {loadingTourId === tour.tourId && (
            <GridLoader
              color="#ffa726"
              margin={10}
              size={30}
              className="tour_action_loading"
            />
          )}

          <FormattedDate date={tour.createdAt} className="req_date" />

          <TourItem
            propertyId={tour.propertyId}
            addressOfTour={tour.addressOfTour}
            dateOfTour={tour.dateOfTour}
            timeOfTour={tour.timeOfTour}
            propertyImage={tour.propertyImage}
          />
          {isAdminView ? (
            <p className="tour_desc">
              This is a tour request made by{' '}
              <Link to={`/admin/users/${tour.schedulerId}/profile`}>
                {tour.schedulerEmail}
              </Link>
            </p>
          ) : (
            <TourStatusMessage status={tour.status} isOwner={isOwner} />
          )}

          {isOwner && tour.status === 'Scheduled' && (
            <div className="tour_action_buttons">
              <button
                className="confirm_btn"
                onClick={() => handleConfirm && handleConfirm(tour.tourId)}
                disabled={!!loadingTourId}
              >
                Confirm
              </button>
              <button
                className="cancel_btn"
                onClick={() => handleCancel && handleCancel(tour.tourId)}
                disabled={!!loadingTourId}
              >
                Cancel
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TourList;
