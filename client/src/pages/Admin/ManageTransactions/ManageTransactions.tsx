import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../api/axiosInstance';

interface Transaction {
  _id: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  paymentReason: string;
  status: string;
  createdAt: string;
}

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosPrivate.get('/admin/transactions');
        setTransactions(response.data);
      } catch (error) {
        setError('Failed to fetch transactions.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="transactions">
      <h1>Manage Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>Payment Intent ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Payment Reason</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.paymentIntentId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.customerEmail}</td>
              <td>{transaction.paymentReason}</td>
              <td>{transaction.status}</td>
              <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTransactions;