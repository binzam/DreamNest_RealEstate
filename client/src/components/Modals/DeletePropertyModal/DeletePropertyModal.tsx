import React from 'react';
import './DeletePropertyModal.css';
import { MdWarning } from 'react-icons/md';
import { FaUserLarge } from 'react-icons/fa6';

interface DeletePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageUrl: string;
  removeType: 'user' | 'property';
}

const DeletePropertyModal: React.FC<DeletePropertyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  imageUrl,
  removeType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="del_pty_modal" role="dialog" aria-modal="true">
      <div className="del_modal_content">
        <MdWarning className='warn_icon_lrg' />
        <h2>
          {removeType === 'property'
            ? 'Remove this property from listing?'
            : 'Remove this user from platform?'}
        </h2>
        <div className="del_pty_img">
          {imageUrl ? <img src={imageUrl} alt="" /> : <FaUserLarge />}
        </div>

        <div className="modal_actions">
          <button className="modal_btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal_btn confirm" onClick={onConfirm}>
            <span className="warn_icon">
              <MdWarning />
            </span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePropertyModal;
