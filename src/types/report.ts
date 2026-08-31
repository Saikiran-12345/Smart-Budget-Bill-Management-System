export type ReportType =
  | 'INCOME_REPORT'
  | 'EXPENSE_REPORT'
  | 'BILL_REPORT'
  | 'PAYMENT_REPORT'
  | 'BUDGET_REPORT'
  | 'SAVINGS_REPORT'
  | 'MONTHLY_SUMMARY_REPORT'
  | 'YEARLY_SUMMARY_REPORT';

export interface ReportFilterCriteria {
  reportType: ReportType;
  startDate: string;
  endDate: string;
  category?: string;
  format?: 'JSON' | 'CSV' | 'PDF_PREVIEW';
}

export interface GeneratedReportHeader {
  reportId: string;
  title: string;
  generatedAt: string;
  periodStart: string;
  periodEnd: string;
  generatedBy: string;
}

export interface FinancialReportData {
  header: GeneratedReportHeader;
  summaryMetrics: Record<string, number | string>;
  tableColumns: string[];
  tableRows: Record<string, any>[];
  notes: string[];
}
