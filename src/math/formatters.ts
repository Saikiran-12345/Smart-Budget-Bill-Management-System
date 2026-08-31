export const formatCurrency = (amount: number, symbol = '₹', decimals = 0): string => {
  if (isNaN(amount) || amount === null || amount === undefined) return `${symbol}0`;
  const formatted = Math.abs(amount).toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
  return amount < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
};

export const formatPercentage = (val: number, decimals = 1): string => {
  if (isNaN(val) || val === null || val === undefined) return '0%';
  return `${val.toFixed(decimals)}%`;
};

export const formatCompactNumber = (num: number, symbol = '₹'): string => {
  if (Math.abs(num) >= 1_00_00_000) {
    return `${symbol}${(num / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (Math.abs(num) >= 1_00_000) {
    return `${symbol}${(num / 1_00_000).toFixed(2)} L`;
  }
  if (Math.abs(num) >= 1_000) {
    return `${symbol}${(num / 1_000).toFixed(1)}k`;
  }
  return `${symbol}${num.toFixed(0)}`;
};

export const truncateText = (str: string, maxLength = 30): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
};
