import { AssetItem, LiabilityItem, NetWorthTracker, NetWorthSummary } from '../math/netWorthTracker';
import { StorageService } from './storageService';

const ASSETS_KEY = 'networth_assets';
const LIABILITIES_KEY = 'networth_liabilities';

const DEFAULT_ASSETS: AssetItem[] = [
  { id: 'ast_1', assetName: 'Savings Bank Account', category: 'LIQUID_CASH', currentValue: 210000, isLiquid: true },
  { id: 'ast_2', assetName: 'Mutual Fund SIP Portfolio', category: 'MUTUAL_FUNDS', currentValue: 450000, isLiquid: true },
  { id: 'ast_3', assetName: 'Direct Equity Stocks', category: 'STOCKS', currentValue: 180000, isLiquid: true },
  { id: 'ast_4', assetName: 'Provident Fund (EPF)', category: 'RETIREMENT', currentValue: 320000, isLiquid: false },
];

const DEFAULT_LIABILITIES: LiabilityItem[] = [
  { id: 'lia_1', liabilityName: 'HDFC Credit Card Balance', category: 'CREDIT_CARD_DEBT', outstandingAmount: 12450, interestRatePercentage: 42, monthlyEMI: 12450 },
  { id: 'lia_2', liabilityName: 'Car Loan', category: 'CAR_LOAN', outstandingAmount: 240000, interestRatePercentage: 8.5, monthlyEMI: 8500 },
];

export class NetWorthService {
  public static getAssets(): AssetItem[] {
    return StorageService.getItem<AssetItem[]>(ASSETS_KEY, DEFAULT_ASSETS);
  }

  public static getLiabilities(): LiabilityItem[] {
    return StorageService.getItem<LiabilityItem[]>(LIABILITIES_KEY, DEFAULT_LIABILITIES);
  }

  public static getSummary(): NetWorthSummary {
    const assets = this.getAssets();
    const liabilities = this.getLiabilities();
    return NetWorthTracker.calculateNetWorth(assets, liabilities);
  }

  public static addAsset(asset: Omit<AssetItem, 'id'>): AssetItem {
    const list = this.getAssets();
    const newAsset: AssetItem = {
      ...asset,
      id: `ast_${Date.now()}`,
    };
    StorageService.setItem(ASSETS_KEY, [...list, newAsset]);
    return newAsset;
  }

  public static addLiability(liability: Omit<LiabilityItem, 'id'>): LiabilityItem {
    const list = this.getLiabilities();
    const newLiability: LiabilityItem = {
      ...liability,
      id: `lia_${Date.now()}`,
    };
    StorageService.setItem(LIABILITIES_KEY, [...list, newLiability]);
    return newLiability;
  }
}
