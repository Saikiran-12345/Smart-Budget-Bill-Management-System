import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionService } from '../services/transactionService';

export function useTransactions() {
  const { incomes, expenses, payments, savingsTransactions } = useApp();

  const transactions = useMemo(() => {
    return TransactionService.getUnifiedTransactions();
  }, [incomes, expenses, payments, savingsTransactions]);

  return {
    transactions,
    totalTransactions: transactions.length,
  };
}
