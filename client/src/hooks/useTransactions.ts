import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '../api/axiosInstance';
import { TransactionType } from '../types/interface';

const fetchTransactions = async () => {
  const response = await axiosPrivate.get('/admin/transactions');
  return response.data;
};

export const useTransactions = () => {
  return useQuery<TransactionType[]>({ queryKey: ['transactions'], queryFn: fetchTransactions });
};
