import { ExpenseCategoryType } from './expense';

export interface Category {
  id: string;
  name: ExpenseCategoryType | string;
  code: string;
  description: string;
  iconName: string;
  colorHex: string;
  bgHex: string;
  isDefault: boolean;
  isEnabled: boolean;
  budgetLimitMonthly?: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDTO {
  name: string;
  description: string;
  iconName: string;
  colorHex: string;
  bgHex: string;
  budgetLimitMonthly?: number;
}
