import { IoMdInformationCircleOutline } from 'react-icons/io';
import { ImCheckboxChecked } from 'react-icons/im';
import { GiCancel } from 'react-icons/gi';
import './TourList.css';
import { TourType } from '../../types/interface';
import { GridLoader } from 'react-spinners';
import TourItem from './TourItem';
import FormattedDate from '../FormattedDate/FormattedDate';
interface TourListProps {
  tours: TourType[];
  isOwner: boolean;
  handleCancel?: (tourId: string) => void;
  handleConfirm?: (tourId: string) => void;
  loadingTourId?: string | null;
}

const TourList: React.FC<TourListProps> = ({
  tours,
  isOwner,
  handleCancel,
  handleConfirm,
  loadingTourId,
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
          <div className={`tour_status ${tour.status.toLowerCase()}`}>
            {tour.status === 'Scheduled' && (
              <>
                <IoMdInformationCircleOutline />
                <span>Tour {tour.status}</span>
                <small>
                  *{' '}
                  {isOwner
                    ? 'You need to Confirm or Cancel this tour request.'
                    : 'Waiting for owners confirmation.'}
                </small>
              </>
            )}
            {tour.status === 'Confirmed' && (
              <>
                <ImCheckboxChecked />
                <span>Tour {tour.status}</span>
                <small>
                  *{isOwner ? 'Be ready to host visitors' : 'Be ready to visit'}{' '}
                  on the set Date & Time.
                </small>
              </>
            )}
            {tour.status === 'Canceled' && (
              <>
                <GiCancel />
                <span>Tour {tour.status}</span>
                <small>
                  *{' '}
                  {isOwner
                    ? 'You canceled this tour request.'
                    : 'Request canceled by owner.'}
                </small>
              </>
            )}
          </div>
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
