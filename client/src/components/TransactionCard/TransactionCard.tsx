import { Link } from 'react-router-dom';
import FormattedDate from '../FormattedDate/FormattedDate';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import './TransactionCard.css';
import { TransactionType } from '../../types/interface';
import PropertyAddressTag from '../PropertyAddressTag/PropertyAddressTag';
import { RiUser3Line } from 'react-icons/ri';
import { IoMdInformationCircleOutline } from 'react-icons/io';
interface TransactionCardProps {
  transaction: TransactionType;
  className?: string;
}
const TransactionCard = ({ transaction, className }: TransactionCardProps) => {
  const formatAddress = (address: string) => {
    if (!address) return { street: '', cityState: '' };

    const [street, ...cityState] = address.split(',');
    return {
      street: street.trim(),
      cityState: cityState.join(',').trim(),
    };
  };

  return (
    <div>
      <div className={`txn_card ${className}`}>
        {transaction.propertyId && (
          <div>
            <Link
              className="txn_detail"
              to={`/property-detail/${transaction.propertyId._id}`}
            >
              <div className="txn_rsn">
                {' '}
                <IoMdInformationCircleOutline />
                {transaction.paymentReason}
              </div>

              <div className="txn_detail_pty">
                <div className="txn_pty_img">
                  <img src={transaction.propertyId?.photos[0].image} alt="" />
                </div>
                <PropertyAddressTag
                  city={transaction.propertyId?.address.city}
                  street={transaction.propertyId?.address.street}
                  state={transaction.propertyId?.address.state}
                />
              </div>
            </Link>
          </div>
        )}
        {transaction.tourId && (
          <div>
            <Link
              className="txn_detail"
              to={`/admin/users/${transaction.customerId}/tour-schedules/${transaction.tourId._id}`}
            >
              <div className="txn_rsn">
                {' '}
                <IoMdInformationCircleOutline />
                {transaction.paymentReason}
              </div>
              <div className="txn_detail_pty">
                <div className="txn_pty_img">
                  <img src={transaction.tourId?.propertyImage} alt="" />
                </div>

                <PropertyAddressTag className='txn_pty_address'
                  city={
                    formatAddress(transaction.tourId?.addressOfTour).cityState
                  }
                  street={
                    formatAddress(transaction.tourId?.addressOfTour).street
                  }
                  state={''}
                />
              </div>
            </Link>
          </div>
        )}
        <div>
          <Link
            className="txn_cstmer"
            to={`/admin/users/${transaction.customerId}/profile`}
          >
            <RiUser3Line />
            <div>
            {transaction.customerEmail}
            </div>
          </Link>
        </div>

        {!transaction.propertyId && !transaction.tourId && <div> </div>}
        <div className="txn_status">{transaction.status}</div>
        <div className='date_txn'>
          <FormattedDate
            date={transaction.createdAt}
            prefix=""
            className="pty_post_date fixed_width"
          />
          
        </div>
        <div>
          <PriceDisplay
            amount={transaction.amount}
            currency={transaction.currency}
            className="center"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
