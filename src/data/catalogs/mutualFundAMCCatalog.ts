export interface AssetManagementCompanyDetail {
  amcCode: string;
  amcName: string;
  sponsorName: string;
  totalAUMInCrores: number; // Asset Under Management
  activeSchemesCount: number;
  chiefInvestmentOfficerCIO: string;
  headquartersCity: string;
  sebiRegistrationNumber: string;
}

export const MUTUAL_FUND_AMC_CATALOG: AssetManagementCompanyDetail[] = [
  {
    amcCode: 'SBI_MF',
    amcName: 'SBI Funds Management Limited',
    sponsorName: 'State Bank of India',
    totalAUMInCrores: 920000,
    activeSchemesCount: 145,
    chiefInvestmentOfficerCIO: 'R. Srinivasan',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/009/93/3',
  },
  {
    amcCode: 'ICICI_PRU_MF',
    amcName: 'ICICI Prudential Asset Management Co. Ltd.',
    sponsorName: 'ICICI Bank & Prudential plc',
    totalAUMInCrores: 750000,
    activeSchemesCount: 160,
    chiefInvestmentOfficerCIO: 'S Naren',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/003/93/1',
  },
  {
    amcCode: 'HDFC_MF',
    amcName: 'HDFC Asset Management Company Ltd.',
    sponsorName: 'HDFC Bank Ltd.',
    totalAUMInCrores: 680000,
    activeSchemesCount: 130,
    chiefInvestmentOfficerCIO: 'Prashant Jain (Former) / Chirag Setalvad',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/044/00/6',
  },
  {
    amcCode: 'NIPPON_INDIA_MF',
    amcName: 'Nippon Life India Asset Management Ltd.',
    sponsorName: 'Nippon Life Insurance Company',
    totalAUMInCrores: 450000,
    activeSchemesCount: 110,
    chiefInvestmentOfficerCIO: 'Sailesh Raj Bhan',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/035/98/1',
  },
  {
    amcCode: 'KOTAK_MF',
    amcName: 'Kotak Mahindra Asset Management Co. Ltd.',
    sponsorName: 'Kotak Mahindra Bank',
    totalAUMInCrores: 410000,
    activeSchemesCount: 105,
    chiefInvestmentOfficerCIO: 'Harsha Upadhyaya',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/038/98/1',
  },
  {
    amcCode: 'AXIS_MF',
    amcName: 'Axis Asset Management Company Ltd.',
    sponsorName: 'Axis Bank Ltd.',
    totalAUMInCrores: 260000,
    activeSchemesCount: 95,
    chiefInvestmentOfficerCIO: 'Ash uncertainty / Jinesh Gopani',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/061/09/02',
  },
  {
    amcCode: 'UTI_MF',
    amcName: 'UTI Asset Management Company Ltd.',
    sponsorName: 'SBI, PNB, BOB, LIC',
    totalAUMInCrores: 280000,
    activeSchemesCount: 120,
    chiefInvestmentOfficerCIO: 'Vetri Subramaniam',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/048/03/01',
  },
  {
    amcCode: 'MIRAE_ASSET_MF',
    amcName: 'Mirae Asset Investment Managers (India)',
    sponsorName: 'Mirae Asset Financial Group (Korea)',
    totalAUMInCrores: 170000,
    activeSchemesCount: 55,
    chiefInvestmentOfficerCIO: 'Neelesh Surana',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/055/07/03',
  },
  {
    amcCode: 'PPFAS_MF',
    amcName: 'PPFAS Asset Management Private Ltd.',
    sponsorName: 'Parag Parikh Financial Advisory Services',
    totalAUMInCrores: 75000,
    activeSchemesCount: 5,
    chiefInvestmentOfficerCIO: 'Rajeev Thakkar',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/069/12/01',
  },
  {
    amcCode: 'QUANT_MF',
    amcName: 'Quant Money Managers Limited',
    sponsorName: 'Quant Capital',
    totalAUMInCrores: 90000,
    activeSchemesCount: 28,
    chiefInvestmentOfficerCIO: 'Sandeep Tandon',
    headquartersCity: 'Mumbai',
    sebiRegistrationNumber: 'MF/032/96/1',
  },
];
