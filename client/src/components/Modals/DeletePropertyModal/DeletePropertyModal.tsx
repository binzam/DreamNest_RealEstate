import React from 'react';
import './DeletePropertyModal.css';
import { MdWarning } from 'react-icons/md';

interface DeletePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageUrl: string;
}

const DeletePropertyModal: React.FC<DeletePropertyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  imageUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="del_pty_modal" role="dialog" aria-modal="true">
      <div className="del_modal_content">
        <MdWarning />
        <h2>Remove this property from listing?</h2>
          <div className="del_pty_img">
            <img src={imageUrl} alt="" />
          </div>
        <div className="modal_actions">
          <button className="modal_btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal_btn confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePropertyModal;
