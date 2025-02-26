import React from 'react';
import './ErrorDisplay.css'
interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return message ? (
    <div className="error_display">
      <p>{message}</p>
    </div>
  ) : null;
};

export default ErrorDisplay;
