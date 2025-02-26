import { useEffect } from 'react';
import './MessageDisplay.css';
import { FaCheck } from 'react-icons/fa6';
interface MessageDisPlayProps {
  message: string | null;
  setMessage: (msg: string | null) => void;
  className?: string;
}
const MessageDisplay = ({
  message,
  setMessage,
  className = '',
}: MessageDisPlayProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <div className={`success-message ${className}`}>
      <FaCheck /> {message}
    </div>
  );
};

export default MessageDisplay;
