import { describe, it, expect } from 'vitest';
import { CashflowPredictorEngine } from '../math/cashflowPredictorEngine';

describe('CashflowPredictorEngine Math', () => {
  it('should generate 12-month predictive cashflow forecast', () => {
    const forecast = CashflowPredictorEngine.forecastCashflow(
      [{ id: '1', source: 'Sal', amount: 100000, date: '2026-08-01', category: 'Salary', description: '', frequency: 'MONTHLY', status: 'RECEIVED', isRecurring: true, createdAt: '', updatedAt: '' }],
      [{ id: '1', title: 'Rent', amount: 40000, date: '2026-08-01', category: 'Housing', paymentMethod: 'Cash', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' }],
      200000,
      12
    );

    expect(forecast.length).toBe(12);
    expect(forecast[0].projectedSavingsBalance).toBeGreaterThan(200000);
  });
});
