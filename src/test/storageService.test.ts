import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from '../services/storageService';

describe('StorageService Adapter', () => {
  beforeEach(() => {
    StorageService.clearAll();
  });

  it('should store and retrieve serializable items', () => {
    const data = { key: 'test_value', count: 42 };
    StorageService.setItem('test_key', data);

    const retrieved = StorageService.getItem('test_key', null);
    expect(retrieved).toEqual(data);
  });

  it('should return default value when key does not exist', () => {
    const val = StorageService.getItem('non_existent', 'default');
    expect(val).toBe('default');
  });

  it('should estimate storage quota information', () => {
    StorageService.setItem('quota_test', { payload: 'hello world' });
    const info = StorageService.getStorageQuotaInfo();
    expect(info.usedKB).toBeGreaterThan(0);
    expect(info.totalKB).toBe(5120);
  });
});
