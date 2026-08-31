export interface BankBranchIFSCEntry {
  ifscCode: string;
  micrCode: string;
  bankName: string;
  branchName: string;
  city: string;
  district: string;
  state: string;
  contactNumber: string;
  isRTGSAvailable: boolean;
  isNEFTAvailable: boolean;
  isIMPSAvailable: boolean;
  isUPIEnabled: boolean;
}

export const LARGE_BANK_BRANCH_DIRECTORY: BankBranchIFSCEntry[] = [
  { ifscCode: 'SBIN0000800', micrCode: '560002002', bankName: 'State Bank of India', branchName: 'Bengaluru Main Branch', city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', contactNumber: '080-22271800', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'SBIN0000300', micrCode: '400002001', bankName: 'State Bank of India', branchName: 'Mumbai Main Branch', city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra', contactNumber: '022-22661300', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'SBIN0000691', micrCode: '110002001', bankName: 'State Bank of India', branchName: 'New Delhi Main Branch', city: 'New Delhi', district: 'Central Delhi', state: 'Delhi', contactNumber: '011-23374691', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'HDFC0000001', micrCode: '400240002', bankName: 'HDFC Bank Ltd.', branchName: 'Fort Mumbai Branch', city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra', contactNumber: '022-61606161', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'HDFC0000060', micrCode: '560240002', bankName: 'HDFC Bank Ltd.', branchName: 'MG Road Bengaluru', city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', contactNumber: '080-61606161', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'ICIC0000002', micrCode: '400229002', bankName: 'ICICI Bank Ltd.', branchName: 'Backbay Reclamation Mumbai', city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra', contactNumber: '022-22854002', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'ICIC0000008', micrCode: '560229002', bankName: 'ICICI Bank Ltd.', branchName: 'Koramangala Bengaluru', city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', contactNumber: '080-41100008', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'UTIB0000001', micrCode: '400211002', bankName: 'Axis Bank Ltd.', branchName: 'Fort Mumbai Branch', city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra', contactNumber: '022-22660001', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'UTIB0000009', micrCode: '560211002', bankName: 'Axis Bank Ltd.', branchName: 'Indiranagar Bengaluru', city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', contactNumber: '080-25200009', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
  { ifscCode: 'KKBK0000421', micrCode: '560485002', bankName: 'Kotak Mahindra Bank', branchName: 'Lavelle Road Bengaluru', city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', contactNumber: '080-66000421', isRTGSAvailable: true, isNEFTAvailable: true, isIMPSAvailable: true, isUPIEnabled: true },
];
