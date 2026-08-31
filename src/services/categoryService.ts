import { Category, CreateCategoryDTO } from '../types/category';
import { DEFAULT_CATEGORIES } from '../constants/initialCategories';
import { StorageService } from './storageService';

const STORAGE_KEY = 'expense_categories';

export class CategoryService {
  public static getAll(): Category[] {
    return StorageService.getItem<Category[]>(STORAGE_KEY, DEFAULT_CATEGORIES);
  }

  public static getActive(): Category[] {
    return this.getAll().filter((c) => c.isEnabled);
  }

  public static getById(id: string): Category | undefined {
    return this.getAll().find((c) => c.id === id);
  }

  public static add(dto: CreateCategoryDTO): Category {
    const list = this.getAll();
    const now = new Date().toISOString();
    const newCategory: Category = {
      id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: dto.name,
      code: dto.name.toUpperCase().replace(/\s+/g, '_'),
      description: dto.description,
      iconName: dto.iconName,
      colorHex: dto.colorHex,
      bgHex: dto.bgHex,
      isDefault: false,
      isEnabled: true,
      budgetLimitMonthly: dto.budgetLimitMonthly,
      displayOrder: list.length + 1,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [...list, newCategory];
    StorageService.setItem(STORAGE_KEY, updated);
    return newCategory;
  }

  public static update(id: string, updates: Partial<Category>): Category | null {
    const list = this.getAll();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedCategory = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedCategory;
    StorageService.setItem(STORAGE_KEY, list);
    return updatedCategory;
  }

  public static toggleStatus(id: string): Category | null {
    const category = this.getById(id);
    if (!category) return null;
    return this.update(id, { isEnabled: !category.isEnabled });
  }

  public static delete(id: string): boolean {
    const list = this.getAll();
    const target = list.find((c) => c.id === id);
    if (!target) return false;
    if (target.isDefault) {
      throw new Error('Default system categories cannot be deleted.');
    }

    const filtered = list.filter((c) => c.id !== id);
    StorageService.setItem(STORAGE_KEY, filtered);
    return true;
  }
}
