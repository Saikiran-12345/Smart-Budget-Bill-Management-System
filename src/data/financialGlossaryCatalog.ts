export interface FinancialTermEntry {
  termId: string;
  termName: string;
  category: 'TAXATION' | 'INVESTING' | 'BANKING' | 'BUDGETING' | 'RETIREMENT' | 'INSURANCE';
  definitionText: string;
  formulaText?: string;
  exampleText?: string;
  regulatoryBodyRef?: string;
}

export const FINANCIAL_GLOSSARY_CATALOG: FinancialTermEntry[] = [
  {
    termId: 'CAGR',
    termName: 'Compound Annual Growth Rate (CAGR)',
    category: 'INVESTING',
    definitionText: 'The mean annual growth rate of an investment over a specified period of time longer than one year, assuming returns compound annually.',
    formulaText: 'CAGR = (Final Value / Beginning Value) ^ (1 / Years) - 1',
    exampleText: 'An investment growing from ₹100,000 to ₹200,000 in 5 years has a CAGR of 14.87%.',
    regulatoryBodyRef: 'SEBI',
  },
  {
    termId: 'XIRR',
    termName: 'Extended Internal Rate of Return (XIRR)',
    category: 'INVESTING',
    definitionText: 'A method of calculating returns on investments made at multiple uneven cashflow intervals, such as SIP deposits.',
    formulaText: 'NPV = Sum(C_i / (1 + XIRR) ^ ((d_i - d_0) / 365)) = 0',
    exampleText: 'Calculating returns for 36 monthly SIP payments of ₹5,000 each.',
    regulatoryBodyRef: 'SEBI',
  },
  {
    termId: 'SECTION_80C',
    termName: 'Section 80C Tax Deduction',
    category: 'TAXATION',
    definitionText: 'A provision under the Indian Income Tax Act 1961 allowing individuals to claim deductions up to ₹1,50,000 per financial year for specified investments like EPF, PPF, ELSS, NPS, and home loan principal.',
    formulaText: 'Tax Saved = Min(Actual Investments, 150000) * Tax Slab Rate',
    exampleText: 'Investing ₹1.5 Lakhs in ELSS under 30% tax slab saves ₹46,800 in taxes.',
    regulatoryBodyRef: 'Income Tax Department of India',
  },
  {
    termId: 'SECTION_80D',
    termName: 'Section 80D Health Insurance Deduction',
    category: 'TAXATION',
    definitionText: 'Allows tax deductions for medical insurance premiums paid for self, family, and senior citizen parents up to ₹25,000 (Self) and ₹50,000 (Senior Parents).',
    formulaText: 'Max Deduction = ₹25,000 (Self <60) + ₹50,000 (Parents >=60) = ₹75,000',
    exampleText: 'Paying ₹20,000 for self policy and ₹40,000 for senior parents saves ₹18,720 tax.',
    regulatoryBodyRef: 'Income Tax Department of India',
  },
  {
    termId: 'FIRE',
    termName: 'Financial Independence, Retire Early (FIRE)',
    category: 'RETIREMENT',
    definitionText: 'A financial lifestyle movement defined by extreme savings and investing to accumulate 25x-30x annual expenses to retire early.',
    formulaText: 'Target FIRE Corpus = Annual Living Expenses * 25',
    exampleText: 'If annual living expenses are ₹6 Lakhs, the target FIRE corpus is ₹1.5 Crores.',
    regulatoryBodyRef: 'FinTech Standard',
  },
  {
    termId: 'DSCR',
    termName: 'Debt Service Coverage Ratio (DSCR)',
    category: 'BANKING',
    definitionText: 'A measure of cash flow available to pay current debt obligations like monthly loan EMIs and credit card bills.',
    formulaText: 'DSCR = Net Operating Monthly Income / Total Monthly EMI Debt Obligations',
    exampleText: 'A net income of ₹1,00,000 against EMI obligations of ₹30,000 yields a safe DSCR of 3.33.',
    regulatoryBodyRef: 'RBI',
  },
  {
    termId: 'CAP_RATE',
    termName: 'Capitalization Rate (Cap Rate)',
    category: 'INVESTING',
    definitionText: 'A real estate valuation metric used to indicate the rate of return expected to be generated on a real estate property.',
    formulaText: 'Cap Rate % = (Net Operating Annual Income / Property Purchase Price) * 100',
    exampleText: 'A property costing ₹80 Lakhs generating ₹4 Lakhs net annual rent has a 5.0% Cap Rate.',
    regulatoryBodyRef: 'RERA',
  },
  {
    termId: 'SIP',
    termName: 'Systematic Investment Plan (SIP)',
    category: 'INVESTING',
    definitionText: 'An investment facility offered by mutual funds allowing investors to invest a fixed amount regularly (monthly/quarterly) in mutual fund schemes.',
    formulaText: 'Maturity = P * [((1 + i)^n - 1) / i] * (1 + i)',
    exampleText: 'Investing ₹5,000 every 1st of the month in an Equity Index Fund.',
    regulatoryBodyRef: 'AMFI / SEBI',
  },
];
