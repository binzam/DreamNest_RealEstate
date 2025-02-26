import { useEffect, useState } from 'react';
import './ManageTransactions.css';
import { Loader } from '../../../components/Loader';
import TransactionCard from '../../../components/TransactionCard/TransactionCard';
import { TransactionType } from '../../../types/interface';
import { useTransactions } from '../../../hooks/useTransactions';
import ErrorDisplay from '../../../components/ErrorDisplay/ErrorDisplay';
import Container from '../../../components/Container/Container';

const ManageTransactions = () => {
  const [filter, setFilter] = useState<'all' | 'tour' | 'property'>('all');
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionType[]>(transactions);

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

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <Container>
      <div className="transactions">
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
        <div className="txn_cntn">
          <div className="txns_list">
            <div className="txns_list_hdr">
              <div className="rsn">Reason</div>
              <div className="cust">Customer</div>
              <div>Status</div>
              <div>Amount <small>date</small></div>
            </div>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionCard
                  className=""
                  key={transaction._id}
                  transaction={transaction}
                />
              ))
            ) : (
              <p>No transaction data.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ManageTransactions;
