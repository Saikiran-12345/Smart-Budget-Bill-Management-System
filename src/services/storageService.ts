export class StorageService {
  private static PREFIX = 'smart_budget_';

  public static getItem<T>(key: string, defaultValue: T): T {
    try {
      const fullKey = this.PREFIX + key;
      const json = localStorage.getItem(fullKey);
      if (json === null) return defaultValue;
      return JSON.parse(json) as T;
    } catch (err) {
      console.error(`Error reading key "${key}" from localStorage:`, err);
      return defaultValue;
    }
  }

  public static setItem<T>(key: string, value: T): boolean {
    try {
      const fullKey = this.PREFIX + key;
      const json = JSON.stringify(value);
      localStorage.setItem(fullKey, json);
      return true;
    } catch (err) {
      console.error(`Error saving key "${key}" to localStorage:`, err);
      return false;
    }
  }

  public static removeItem(key: string): void {
    try {
      const fullKey = this.PREFIX + key;
      localStorage.removeItem(fullKey);
    } catch (err) {
      console.error(`Error removing key "${key}" from localStorage:`, err);
    }
  }

  public static clearAll(): void {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  }

  public static getStorageQuotaInfo(): { usedKB: number; totalKB: number; usagePercentage: number } {
    let totalBytes = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key) || '';
          totalBytes += (key.length + val.length) * 2;
        }
      }
    } catch (e) {
      totalBytes = 0;
    }

    const usedKB = parseFloat((totalBytes / 1024).toFixed(2));
    const totalKB = 5120; // 5 MB typical browser quota
    const usagePercentage = parseFloat(((usedKB / totalKB) * 100).toFixed(1));

    return { usedKB, totalKB, usagePercentage };
  }
}
