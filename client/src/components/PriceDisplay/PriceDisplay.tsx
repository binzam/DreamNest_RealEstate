import React from 'react';
import './PriceDisplay.css';
import { BeatLoader } from 'react-spinners';
interface PriceDisplayProps {
  amount: number;
  currency: string;
  isLoading?: boolean;
  convertedAmount?: number | null;
  selectedCurrency?: string;
  propertyFor?: string;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  currency,
  isLoading = false,
  convertedAmount = null,
  selectedCurrency = currency,
  propertyFor = 'sale',
  className,
}) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className={`price_display ${className}`}>
      {isLoading ? (
        <BeatLoader color="#008000" margin={10} size={11} />
      ) : convertedAmount !== null ? (
        formatCurrency(convertedAmount, selectedCurrency)
      ) : (
        formatCurrency(amount, currency)
      )}
      {propertyFor === 'rent' && <small>/ month</small>}
    </div>
  );
};

export default PriceDisplay;
