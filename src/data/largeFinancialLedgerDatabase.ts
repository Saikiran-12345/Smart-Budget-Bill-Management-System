export interface DetailedLedgerTransaction {
  transactionId: string;
  entryDate: string;
  accountType: 'SAVINGS' | 'CURRENT' | 'CREDIT_CARD' | 'WALLET' | 'FD' | 'MUTUAL_FUND';
  flowType: 'INCOME' | 'EXPENSE' | 'INVESTMENT' | 'TRANSFER';
  primaryCategory: string;
  subCategory: string;
  merchantOrPayeeName: string;
  amountINR: number;
  paymentMode: 'UPI' | 'NET_BANKING' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NEFT' | 'AUTO_DEBIT';
  statusFlag: 'COMPLETED' | 'PENDING' | 'CLEARED' | 'RECONCILED';
  isTaxDeductible: boolean;
  taxSectionReference?: string;
  remarksDescription: string;
}

const GENERATE_LEDGER_ENTRIES = (): DetailedLedgerTransaction[] => {
  const categories = [
    { cat: 'Housing', sub: 'Rent Payout', mode: 'NET_BANKING' as const, tax: false },
    { cat: 'Groceries', sub: 'Supermarket Refill', mode: 'CREDIT_CARD' as const, tax: false },
    { cat: 'Utilities', sub: 'Electricity Bill', mode: 'UPI' as const, tax: false },
    { cat: 'Utilities', sub: 'Fiber Broadband', mode: 'AUTO_DEBIT' as const, tax: false },
    { cat: 'Transportation', sub: 'Fuel Petrol', mode: 'UPI' as const, tax: false },
    { cat: 'Healthcare', sub: 'Pharmacy Prescription', mode: 'CREDIT_CARD' as const, tax: true, sec: 'Section 80D' },
    { cat: 'Investments', sub: 'ELSS SIP Deposit', mode: 'AUTO_DEBIT' as const, tax: true, sec: 'Section 80C' },
    { cat: 'Investments', sub: 'NPS Tier 1 Deposit', mode: 'NET_BANKING' as const, tax: true, sec: 'Section 80CCD(1B)' },
    { cat: 'Dining Out', sub: 'Restaurant Bill', mode: 'CREDIT_CARD' as const, tax: false },
    { cat: 'Subscriptions', sub: 'Streaming Service', mode: 'CREDIT_CARD' as const, tax: false },
  ];

  const payees = [
    'DLF Estates', 'Nature Basket', 'BESCOM Power', 'Airtel Broadband', 'Shell India',
    'Apollo Pharmacy', 'Parag Parikh Mutual Fund', 'NPS National Trust', 'Toit Brewery', 'Netflix India',
    'Amazon Fresh', 'Star Health', 'HDFC Mutual Fund', 'Swiggy Gourmet', 'Uber Rides',
    'Zomato Gold', 'BookMyShow', 'Cult.Fit Gym', 'MakeMyTrip', 'Flipkart Shopping'
  ];

  const entries: DetailedLedgerTransaction[] = [];

  for (let i = 1; i <= 600; i++) {
    const c = categories[i % categories.length];
    const payee = payees[i % payees.length];
    const month = (i % 12 + 1).toString().padStart(2, '0');
    const day = (i % 28 + 1).toString().padStart(2, '0');
    const amt = Math.round(500 + ((i * 37) % 45000));

    entries.push({
      transactionId: `TXN-2025-${i.toString().padStart(5, '0')}`,
      entryDate: `2025-${month}-${day}`,
      accountType: i % 3 === 0 ? 'CREDIT_CARD' : i % 2 === 0 ? 'SAVINGS' : 'WALLET',
      flowType: c.cat === 'Investments' ? 'INVESTMENT' : 'EXPENSE',
      primaryCategory: c.cat,
      subCategory: c.sub,
      merchantOrPayeeName: payee,
      amountINR: amt,
      paymentMode: c.mode,
      statusFlag: 'COMPLETED',
      isTaxDeductible: c.tax,
      taxSectionReference: c.sec,
      remarksDescription: `Automated transaction entry for ${payee} under ${c.cat} - ${c.sub}`,
    });
  }

  return entries;
};

export const LARGE_FINANCIAL_LEDGER_DATABASE: DetailedLedgerTransaction[] = GENERATE_LEDGER_ENTRIES();
