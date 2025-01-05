import { FaHome } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { BsSmartwatch } from 'react-icons/bs';
import { ImCheckboxChecked } from 'react-icons/im';
import { GiCancel } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import './TourList.css';
import { TourType } from '../../types/interface';
import { GridLoader } from 'react-spinners';
import { formatDistance } from 'date-fns';
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
          <span className="req_date">
            {formatDistance(new Date(tour.createdAt), new Date(), {
              addSuffix: true,
            })}
          </span>
          <div className="tour_body">
            <Link
              to={`/property-detail/${tour.propertyId}`}
              className="tour_img"
            >
              <img src={tour.propertyImage} alt={tour.addressOfTour} />
            </Link>
            <div className="tour_info">
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
          </div>
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
