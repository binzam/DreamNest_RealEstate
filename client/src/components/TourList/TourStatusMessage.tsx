import { GiCancel } from "react-icons/gi";
import { ImCheckboxChecked } from "react-icons/im";
import { IoMdInformationCircleOutline } from "react-icons/io";
import './TourList.css';

const TourStatusMessage: React.FC<{ status: string; isOwner: boolean }> = ({
  status,
  isOwner,
}) => {
  const statusMessages: Record<
    string,
    { icon: JSX.Element; message: string; subMessage: string }
  > = {
    Scheduled: {
      icon: <IoMdInformationCircleOutline />,
      message: `Tour ${status}`,
      subMessage: isOwner
        ? 'You need to Confirm or Cancel this tour request.'
        : 'Waiting for owner’s confirmation.',
    },
    Confirmed: {
      icon: <ImCheckboxChecked />,
      message: `Tour ${status}`,
      subMessage: isOwner
        ? 'Be ready to host visitors'
        : 'Be ready to visit on the set Date & Time.',
    },
    Canceled: {
      icon: <GiCancel />,
      message: `Tour ${status}`,
      subMessage: isOwner
        ? 'You canceled this tour request.'
        : 'Request canceled by owner.',
    },
  };

  const { icon, message, subMessage } = statusMessages[status] || {};

  return icon ? (
    <div className={`tour_status ${status.toLowerCase()}`}>
      <div className="status_msg">
      {icon}
      <span>{message}</span>
      </div>
      <small>* {subMessage}</small>
    </div>
  ) : null;
};

export default TourStatusMessage;
