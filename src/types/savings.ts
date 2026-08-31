export type SavingsGoalStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';

export type SavingsPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface SavingsGoal {
  id: string;
  goalName: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  targetDate: string;
  priority: SavingsPriority;
  status: SavingsGoalStatus;
  notes?: string;
  monthlyTargetContribution: number;
  autoSaveEnabled?: boolean;
  colorHex?: string;
  iconName?: string;
  createdAt: string;
  updatedAt: string;
}

export type SavingsTransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'INTEREST';

export interface SavingsTransaction {
  id: string;
  goalId: string;
  goalName: string;
  amount: number;
  type: SavingsTransactionType;
  date: string;
  note?: string;
  createdAt: string;
}

export interface SavingsProgressSummary {
  goalId: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  remainingAmount: number;
  progressPercentage: number;
  daysRemaining: number;
  isCompleted: boolean;
  projectedCompletionDate: string;
  requiredMonthlyDeposit: number;
}
