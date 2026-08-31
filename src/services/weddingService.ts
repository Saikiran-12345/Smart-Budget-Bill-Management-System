import { WeddingExpenseAllocatorEngine, WeddingAllocationDetail } from '../math/calculators/weddingExpenseAllocatorEngine';

export class WeddingService {
  public static getWeddingAllocation(
    totalWeddingBudget = 1500000,
    guestCount = 300
  ): {
    totalWeddingBudget: number;
    guestCount: number;
    costPerGuest: number;
    allocations: WeddingAllocationDetail[];
  } {
    return WeddingExpenseAllocatorEngine.calculateAllocations(totalWeddingBudget, guestCount);
  }
}
