import { FaXmark } from 'react-icons/fa6';
import './ImagePreviewModal.css';
interface ImagePreviewModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImagePreviewModal = ({ imageUrl, onClose }: ImagePreviewModalProps) => {
  if (!imageUrl) return null;
  return (
    <div className="pty_img_modal" role="dialog" aria-modal="true">
      <div className="pty_img_modal_content">
        <button className="close_modal_button" onClick={onClose}>
          <FaXmark />
        </button>
        <img
          src={imageUrl}
          alt="Enlarged view"
          className="modal_image"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/fallback-image.png';
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
