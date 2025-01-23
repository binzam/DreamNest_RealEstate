import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../api/axiosInstance';
import FormattedDate from '../../../components/FormattedDate/FormattedDate';
import PriceDisplay from '../../../components/PriceDisplay/PriceDisplay';
import './ManageTransactions.css';
import { Link } from 'react-router-dom';
interface Transaction {
  _id: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerId: string;
  paymentReason: string;
  status: string;
  createdAt: string;
  tourId?: string;
  propertyId?: string;
}

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'tour' | 'property'>('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosPrivate.get('/admin/transactions');
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        console.log(response);
      } catch (error) {
        setError('Failed to fetch transactions.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);
  useEffect(() => {
    if (filter === 'all') {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) =>
        filter === 'tour'
          ? transaction.paymentReason.includes('Tour')
          : transaction.paymentReason.includes('Property')
      );
      setFilteredTransactions(filtered);
    }
  }, [filter, transactions]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="transactions">
      <h1>Manage Transactions</h1>
      <div className="filter-buttons">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All Transactions
        </button>
        <button
          onClick={() => setFilter('tour')}
          className={filter === 'tour' ? 'active' : ''}
        >
          Tour Scheduling Fees
        </button>
        <button
          onClick={() => setFilter('property')}
          className={filter === 'property' ? 'active' : ''}
        >
          Property Listing Fees
        </button>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Payment Reason</th>
            <th>Tour ID</th>
            <th>Property ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>
                <Link to={`/admin/users/${transaction.customerId}/profile`}>
                  {transaction.customerEmail}
                </Link>
              </td>
              <td>{transaction.paymentReason}</td>
              <td>
                {transaction.tourId ? (
                  <Link to={`/tours/${transaction.tourId}`}>
                    view Tour detail
                  </Link>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                {transaction.propertyId ? (
                  <Link to={`/property-detail/${transaction.propertyId}`}>
                    view property
                  </Link>
                ) : (
                  'N/A'
                )}
              </td>
              <td>{transaction.status}</td>
              <td>
                <FormattedDate
                  date={transaction.createdAt}
                  prefix=""
                  className="post_date_admn_dash"
                />
              </td>
              <td>
                <PriceDisplay
                  amount={transaction.amount}
                  currency={transaction.currency}
                  className="sml"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTransactions;
