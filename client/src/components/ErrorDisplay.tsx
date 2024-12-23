import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return message ? (
    <div
      style={{
        backgroundColor: 'red',
        width: '100%',
        padding: '5px 10px',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '0.5rem 0',
      }}
    >
      <div style={{ color: 'white', fontSize: '14px', fontWeight: "600" }}>{message}</div>
    </div>
  ) : null;
};

export default ErrorDisplay;
