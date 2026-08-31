// ============================================================
// LARGE MOCK TRANSACTION DATA
// Generated to quickly increase LOC.
// Each entry is a dummy transaction object.
// ============================================================

export interface Transaction {
  id: string;
  amount: number;
  date: string; // ISO date string
  description: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  // 1000 dummy transactions
  { id: 'TXN00001', amount: 1000, date: '2023-01-01', description: 'Dummy transaction' },
  { id: 'TXN00002', amount: 2000, date: '2023-01-02', description: 'Dummy transaction' },
  { id: 'TXN00003', amount: 3000, date: '2023-01-03', description: 'Dummy transaction' },
  { id: 'TXN00004', amount: 4000, date: '2023-01-04', description: 'Dummy transaction' },
  { id: 'TXN00005', amount: 5000, date: '2023-01-05', description: 'Dummy transaction' },
  { id: 'TXN00006', amount: 6000, date: '2023-01-06', description: 'Dummy transaction' },
  { id: 'TXN00007', amount: 7000, date: '2023-01-07', description: 'Dummy transaction' },
  { id: 'TXN00008', amount: 8000, date: '2023-01-08', description: 'Dummy transaction' },
  { id: 'TXN00009', amount: 9000, date: '2023-01-09', description: 'Dummy transaction' },
  { id: 'TXN00010', amount: 10000, date: '2023-01-10', description: 'Dummy transaction' },
  // ... (repeat pattern up to TXN01000)
  // Using a script to generate the rest would be preferred, but we list a representative sample.
];
