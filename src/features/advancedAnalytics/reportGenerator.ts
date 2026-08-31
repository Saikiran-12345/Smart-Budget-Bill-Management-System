// ============================================================
// Advanced Analytics – Report Generator
// This module provides a comprehensive set of utilities to generate
// financial reports in various formats (HTML, CSV, PDF) with detailed
// sections, data aggregation, and export capabilities.
// ============================================================

import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { writeFileSync } from 'fs';
import { Transaction } from '../../data/largeMockTransactions';
import { User } from '../../models/user';

/**
 * Types representing different report sections.
 */
export type ReportSection = {
  title: string;
  content: string;
};

/**
 * Options for generating a report.
 */
export interface ReportOptions {
  /** Date range for the report */
  from: Date;
  /** Date range for the report */
  to: Date;
  /** List of users to include */
  users: User[];
  /** Include transaction details? */
  includeTransactions?: boolean;
  /** Output format */
  format: 'html' | 'csv' | 'pdf';
}

/**
 * Main entry point – generate a report according to the supplied options.
 */
export async function generateReport(options: ReportOptions): Promise<string | Buffer> {
  // Validate date range
  if (options.from > options.to) {
    throw new Error('Invalid date range: `from` must be before `to`.');
  }

  // Gather data
  const filteredTransactions = await filterTransactions(options.from, options.to, options.users);

  // Build sections
  const sections: ReportSection[] = [];
  sections.push(generateHeaderSection(options));
  sections.push(generateSummarySection(filteredTransactions));
  sections.push(generateSpendingBreakdownSection(filteredTransactions));
  sections.push(generateIncomeBreakdownSection(filteredTransactions));
  if (options.includeTransactions) {
    sections.push(generateTransactionListSection(filteredTransactions));
  }
  sections.push(generateFooterSection());

  // Render according to format
  switch (options.format) {
    case 'html':
      return renderHtml(sections);
    case 'csv':
      return renderCsv(sections);
    case 'pdf':
      return renderPdf(sections);
    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
}

/**
 * Filter transactions based on date range and users.
 */
export async function filterTransactions(
  from: Date,
  to: Date,
  users: User[]
): Promise<Transaction[]> {
  // In a real implementation this would query a database.
  // Here we simulate with an in‑memory array.
  const userIds = new Set(users.map((u) => u.id));
  const result: Transaction[] = [];
  for (const tx of MOCK_TRANSACTIONS) {
    const txDate = new Date(tx.date);
    if (txDate >= from && txDate <= to && userIds.has(tx.userId)) {
      result.push(tx);
    }
  }
  return result;
}

/**
 * Generate the header section of the report.
 */
export function generateHeaderSection(options: ReportOptions): ReportSection {
  const title = `Financial Report – ${format(options.from, 'yyyy‑MM‑dd')} to ${format(
    options.to,
    'yyyy‑MM‑dd'
  )}`;
  const content = `Generated on ${format(new Date(), 'PPpp')} for ${options.users.length} user(s).`;
  return { title, content };
}

/**
 * Generate a high‑level summary of income and expense.
 */
export function generateSummarySection(transactions: Transaction[]): ReportSection {
  let totalIncome = 0;
  let totalExpense = 0;
  for (const tx of transactions) {
    if (tx.amount >= 0) {
      totalIncome += tx.amount;
    } else {
      totalExpense += Math.abs(tx.amount);
    }
  }
  const net = totalIncome - totalExpense;
  const title = 'Summary';
  const content = `Income: ₹${totalIncome.toFixed(2)}\nExpense: ₹${totalExpense.toFixed(
    2
  )}\nNet: ₹${net.toFixed(2)}`;
  return { title, content };
}

/**
 * Break down spending by category.
 */
export function generateSpendingBreakdownSection(transactions: Transaction[]): ReportSection {
  const categories: Record<string, number> = {};
  for (const tx of transactions) {
    if (tx.amount < 0) {
      const cat = tx.category || 'Other';
      categories[cat] = (categories[cat] || 0) + Math.abs(tx.amount);
    }
  }
  const lines = Object.entries(categories).map(
    ([cat, amt]) => `${cat}: ₹${amt.toFixed(2)}`
  );
  return { title: 'Spending Breakdown', content: lines.join('\n') };
}

/**
 * Break down income by source.
 */
export function generateIncomeBreakdownSection(transactions: Transaction[]): ReportSection {
  const sources: Record<string, number> = {};
  for (const tx of transactions) {
    if (tx.amount > 0) {
      const src = tx.source || 'Other';
      sources[src] = (sources[src] || 0) + tx.amount;
    }
  }
  const lines = Object.entries(sources).map(
    ([src, amt]) => `${src}: ₹${amt.toFixed(2)}`
  );
  return { title: 'Income Breakdown', content: lines.join('\n') };
}

/**
 * List all transactions in a tabular format.
 */
export function generateTransactionListSection(transactions: Transaction[]): ReportSection {
  const header = 'Date | Description | Amount';
  const rows = transactions.map(
    (tx) => `${tx.date} | ${tx.description} | ₹${tx.amount.toFixed(2)}`
  );
  return { title: 'Transaction Details', content: [header, ...rows].join('\n') };
}

/**
 * Footer with disclaimer.
 */
export function generateFooterSection(): ReportSection {
  const title = 'Disclaimer';
  const content =
    'This report is generated for informational purposes only and does not constitute financial advice.';
  return { title, content };
}

/**
 * Render the full report as HTML.
 */
export function renderHtml(sections: ReportSection[]): string {
  const htmlSections = sections
    .map(
      (sec) => `<section><h2>${sec.title}</h2><pre>${sec.content}</pre></section>`
    )
    .join('\n');
  return `<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="UTF-8"><title>Financial Report</title></head>\n<body>${htmlSections}</body>\n</html>`;
}

/**
 * Render the report as CSV (section titles become columns).
 */
export function renderCsv(sections: ReportSection[]): string {
  const rows: string[] = [];
  const maxLines = Math.max(
    ...sections.map((sec) => sec.content.split('\n').length)
  );
  // Header row
  rows.push(sections.map((sec) => sec.title).join(','));
  // Data rows
  for (let i = 0; i < maxLines; i++) {
    const line = sections
      .map((sec) => {
        const lines = sec.content.split('\n');
        return lines[i] ?? '';
      })
      .join(',');
    rows.push(line);
  }
  return rows.join('\n');
}

/**
 * Render the report as a PDF using jsPDF and autoTable.
 */
export function renderPdf(sections: ReportSection[]): Buffer {
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(16);
  doc.text('Financial Report', 105, y, { align: 'center' });
  y += 10;
  doc.setFontSize(12);
  sections.forEach((sec) => {
    doc.text(sec.title, 10, y);
    y += 6;
    // Split content into rows for table rendering
    const rows = sec.content.split('\n').map((line) => [line]);
    autoTable(doc, {
      startY: y,
      head: [],
      body: rows,
      theme: 'plain',
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 4;
  });
  // Return the PDF as a Buffer
  const pdfData = doc.output('arraybuffer');
  return Buffer.from(pdfData);
}

/**
 * Utility to save report output to a file.
 */
export function saveReportToFile(
  data: string | Buffer,
  filePath: string,
  format: 'html' | 'csv' | 'pdf'
): void {
  if (format === 'pdf' && data instanceof Buffer) {
    writeFileSync(filePath, data);
  } else if (typeof data === 'string') {
    writeFileSync(filePath, data, { encoding: 'utf-8' });
  } else {
    throw new Error('Invalid data type for the chosen format');
  }
}

/**
 * Example usage – this function can be called from a CLI script.
 */
export async function exampleUsage(): Promise<void> {
  const options: ReportOptions = {
    from: new Date('2023-01-01'),
    to: new Date('2023-12-31'),
    users: [], // populate with real users
    includeTransactions: true,
    format: 'pdf',
  };
  const report = await generateReport(options);
  saveReportToFile(report as Buffer, './reports/annual_report.pdf', 'pdf');
}

// -----------------------------------------------------------
// End of reportGenerator.ts
// -----------------------------------------------------------
