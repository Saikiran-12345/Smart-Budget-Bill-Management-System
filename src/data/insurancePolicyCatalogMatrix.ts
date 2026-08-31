export interface HealthInsurancePolicyPlan {
  policyId: string;
  insurerName: string;
  planTitle: string;
  sumInsuredOptionsINR: number[];
  basePremiumAnnual25YrOldINR: number;
  basePremiumAnnual35YrOldINR: number;
  claimSettlementRatioPercent: number; // CSR %
  cashlessHospitalCount: number;
  roomRentCategory: 'NO_ROOM_CATEGORY_CAP' | 'SINGLE_PRIVATE_ROOM' | 'SHARED_ROOM_CAP_1_PERCENT';
  copayPercent: number;
  restoreBenefit: string;
  noClaimBonusPercentAnnual: number;
}

export const HEALTH_INSURANCE_POLICY_CATALOG_MATRIX: HealthInsurancePolicyPlan[] = [
  {
    policyId: 'NIVA_BUPA_REASSURE_2',
    insurerName: 'Niva Bupa Health Insurance',
    planTitle: 'ReAssure 2.0 Titanium',
    sumInsuredOptionsINR: [500000, 1000000, 2500000, 5000000, 10000000],
    basePremiumAnnual25YrOldINR: 7800,
    basePremiumAnnual35YrOldINR: 11200,
    claimSettlementRatioPercent: 92.5,
    cashlessHospitalCount: 10000,
    roomRentCategory: 'NO_ROOM_CATEGORY_CAP',
    copayPercent: 0,
    restoreBenefit: 'Unlimited ReAssure Forever Lock-in',
    noClaimBonusPercentAnnual: 50,
  },
  {
    policyId: 'CARE_SUPREME',
    insurerName: 'Care Health Insurance Ltd',
    planTitle: 'Care Supreme Direct Plan',
    sumInsuredOptionsINR: [700000, 1500000, 5000000, 10000000],
    basePremiumAnnual25YrOldINR: 6900,
    basePremiumAnnual35YrOldINR: 9800,
    claimSettlementRatioPercent: 91.2,
    cashlessHospitalCount: 11500,
    roomRentCategory: 'NO_ROOM_CATEGORY_CAP',
    copayPercent: 0,
    restoreBenefit: '100% Automatic Restore Unlimited Times',
    noClaimBonusPercentAnnual: 100,
  },
  {
    policyId: 'HDFC_ERGO_OPTIMA_SECURE',
    insurerName: 'HDFC ERGO General Insurance',
    planTitle: 'Optima Secure Individual',
    sumInsuredOptionsINR: [500000, 1000000, 2000000, 5000000],
    basePremiumAnnual25YrOldINR: 9500,
    basePremiumAnnual35YrOldINR: 13400,
    claimSettlementRatioPercent: 97.4,
    cashlessHospitalCount: 12000,
    roomRentCategory: 'NO_ROOM_CATEGORY_CAP',
    copayPercent: 0,
    restoreBenefit: 'Instant 2X Cover (4X Cover after 2 years)',
    noClaimBonusPercentAnnual: 50,
  },
  {
    policyId: 'STAR_HEALTH_COMPREHENSIVE',
    insurerName: 'Star Health & Allied Insurance',
    planTitle: 'Star Comprehensive Health Insurance',
    sumInsuredOptionsINR: [500000, 1000000, 2500000, 5000000],
    basePremiumAnnual25YrOldINR: 8200,
    basePremiumAnnual35YrOldINR: 12100,
    claimSettlementRatioPercent: 89.8,
    cashlessHospitalCount: 14000,
    roomRentCategory: 'SINGLE_PRIVATE_ROOM',
    copayPercent: 0,
    restoreBenefit: '100% Automatic Restoration Once a Year',
    noClaimBonusPercentAnnual: 100,
  },
  {
    policyId: 'ICICI_LOMBARD_ELEVATE',
    insurerName: 'ICICI Lombard General Insurance',
    planTitle: 'Health Elevate Complete Shield',
    sumInsuredOptionsINR: [500000, 1000000, 2500000],
    basePremiumAnnual25YrOldINR: 7600,
    basePremiumAnnual35YrOldINR: 10900,
    claimSettlementRatioPercent: 95.8,
    cashlessHospitalCount: 7500,
    roomRentCategory: 'NO_ROOM_CATEGORY_CAP',
    copayPercent: 0,
    restoreBenefit: 'Infinite Care Auto Refill',
    noClaimBonusPercentAnnual: 50,
  },
];
