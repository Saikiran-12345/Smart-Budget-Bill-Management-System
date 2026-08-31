export type SubscriptionBillingCycle = 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export interface SubscriptionItem {
  id: string;
  serviceName: string;
  provider: string;
  category: string;
  billingAmount: number;
  cycle: SubscriptionBillingCycle;
  nextRenewalDate: string;
  paymentMethod: string;
  autoRenewal: boolean;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
