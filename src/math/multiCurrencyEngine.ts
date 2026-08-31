export interface CurrencyExchangeRate {
  code: string;
  symbol: string;
  rateToINR: number;
}

export const DEFAULT_EXCHANGE_RATES: CurrencyExchangeRate[] = [
  { code: 'INR', symbol: '₹', rateToINR: 1.0 },
  { code: 'USD', symbol: '$', rateToINR: 84.5 },
  { code: 'EUR', symbol: '€', rateToINR: 91.2 },
  { code: 'GBP', symbol: '£', rateToINR: 108.4 },
  { code: 'AED', symbol: 'AED', rateToINR: 23.0 },
];

export class MultiCurrencyEngine {
  public static convertCurrency(
    amount: number,
    fromCode: string,
    toCode: string
  ): number {
    const fromRate = DEFAULT_EXCHANGE_RATES.find((r) => r.code === fromCode)?.rateToINR || 1.0;
    const toRate = DEFAULT_EXCHANGE_RATES.find((r) => r.code === toCode)?.rateToINR || 1.0;

    // Convert from source to INR, then to target
    const amountInINR = amount * fromRate;
    const targetAmount = amountInINR / toRate;

    return parseFloat(targetAmount.toFixed(2));
  }
}
