export type ActivityActionType =
  | 'CREATE_INCOME'
  | 'UPDATE_INCOME'
  | 'DELETE_INCOME'
  | 'CREATE_EXPENSE'
  | 'UPDATE_EXPENSE'
  | 'DELETE_EXPENSE'
  | 'CREATE_BILL'
  | 'UPDATE_BILL'
  | 'DELETE_BILL'
  | 'PAY_BILL'
  | 'CREATE_BUDGET'
  | 'UPDATE_BUDGET'
  | 'DELETE_BUDGET'
  | 'CREATE_SAVINGS_GOAL'
  | 'DEPOSIT_SAVINGS'
  | 'WITHDRAW_SAVINGS'
  | 'IMPORT_DATA'
  | 'EXPORT_DATA'
  | 'RESET_DATA'
  | 'UPDATE_SETTINGS'
  | 'LOGIN'
  | 'LOGOUT';

export interface ActivityLogItem {
  id: string;
  action: ActivityActionType;
  module: string;
  description: string;
  timestamp: string;
  userEmail: string;
  metadata?: Record<string, any>;
}
