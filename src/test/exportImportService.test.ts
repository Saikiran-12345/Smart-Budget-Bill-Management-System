import { describe, it, expect, beforeEach } from 'vitest';
import { ExportImportService } from '../services/exportImportService';
import { StorageService } from '../services/storageService';

describe('ExportImportService JSON Backup Validator', () => {
  beforeEach(() => {
    StorageService.clearAll();
  });

  it('should export full application backup JSON', () => {
    const backup = ExportImportService.exportFullData();
    expect(backup.version).toBe('1.0.0');
    expect(Array.isArray(backup.incomes)).toBe(true);
    expect(Array.isArray(backup.expenses)).toBe(true);
    expect(Array.isArray(backup.bills)).toBe(true);
  });

  it('should validate valid backup data structure', () => {
    const backup = ExportImportService.exportFullData();
    const result = ExportImportService.validateBackupData(backup);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should reject invalid JSON structure', () => {
    const invalidData = { invalidKey: true };
    const result = ExportImportService.validateBackupData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
