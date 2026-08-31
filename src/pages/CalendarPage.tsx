import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { useBills } from '../hooks/useBills';
import { useIncome } from '../hooks/useIncome';
import { formatCurrency } from '../math/formatters';
import { MONTH_NAMES, getDaysInMonth } from '../math/dateUtils';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // August (1-indexed)

  const { bills } = useBills();
  const { incomes } = useIncome();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingEmptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Event Calendar"
        description="Interactive visual calendar highlighting bill due dates, paydays, and savings deadlines."
        action={
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
            <button onClick={prevMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-bold w-36 text-center">
              {MONTH_NAMES[currentMonth - 1]} {currentYear}
            </span>
            <button onClick={nextMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        }
      />

      <Card noPadding>
        <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 text-center text-xs font-bold uppercase text-slate-500 py-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800">
          {leadingEmptyDays.map((_, idx) => (
            <div key={`empty-${idx}`} className="min-h-[100px] bg-slate-50/50 dark:bg-slate-900/50 p-2" />
          ))}

          {daysArray.map((day) => {
            const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayBills = bills.filter((b) => b.dueDate === dateStr);
            const dayIncomes = incomes.filter((i) => i.date === dateStr);

            return (
              <div key={day} className="min-h-[100px] bg-white dark:bg-slate-900 p-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{day}</span>

                <div className="mt-1 space-y-1">
                  {dayIncomes.map((inc) => (
                    <div key={inc.id} className="rounded bg-emerald-50 dark:bg-emerald-950/60 p-1 text-[10px] text-emerald-800 dark:text-emerald-300 truncate">
                      💰 {inc.source} (+{formatCurrency(inc.amount)})
                    </div>
                  ))}
                  {dayBills.map((bill) => (
                    <div
                      key={bill.id}
                      className={`rounded p-1 text-[10px] truncate ${
                        bill.status === 'PAID'
                          ? 'bg-slate-100 text-slate-600 line-through'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                      }`}
                    >
                      📄 {bill.billName} ({formatCurrency(bill.amount)})
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
