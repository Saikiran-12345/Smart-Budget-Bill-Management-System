import { SystemSettings } from '../types/settings';
import { DEFAULT_SETTINGS } from '../constants/defaultSettings';
import { StorageService } from './storageService';

const STORAGE_KEY = 'system_settings';

export class SettingsService {
  public static getSettings(): SystemSettings {
    return StorageService.getItem<SystemSettings>(STORAGE_KEY, DEFAULT_SETTINGS);
  }

  public static updateSettings(updates: Partial<SystemSettings>): SystemSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    StorageService.setItem(STORAGE_KEY, updated);

    // Synchronize HTML element dark class if theme changed
    if (updates.theme) {
      if (updates.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    return updated;
  }

  public static resetToDefaults(): SystemSettings {
    StorageService.setItem(STORAGE_KEY, DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }
}
