import { FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './ShareProperty.css';
import { useState } from 'react';
import { FaShare, FaXTwitter } from 'react-icons/fa6';

interface SharePropertyProps {
  propertyId: string;
  platform?: string;
}

const ShareProperty = ({ propertyId }: SharePropertyProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const propertyUrl = `${window.location.origin}/property-detail/${propertyId}`;

  const shareToSocialMedia = (platform: string) => {
    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${propertyUrl}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${propertyUrl}`,
          '_blank'
        );
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${propertyUrl}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=Check out this property&body=${propertyUrl}`;
        break;
      default:
        break;
    }
  };

  return (
    <div className="share_pty">
      <button className="share_btn" onClick={() => setIsOpen((prev) => !prev)}>
        Share <FaShare />
      </button>
      {isOpen && (
        <div className="share_buttons">
          <button onClick={() => shareToSocialMedia('facebook')}>
            <FaFacebook />
          </button>
          <button onClick={() => shareToSocialMedia('twitter')}>
            <FaXTwitter />
          </button>
          <button onClick={() => shareToSocialMedia('whatsapp')}>
            <FaWhatsapp />
          </button>
          <button onClick={() => shareToSocialMedia('email')}>
            <FaEnvelope />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareProperty;
