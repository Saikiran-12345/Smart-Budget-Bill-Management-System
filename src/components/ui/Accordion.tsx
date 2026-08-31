import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(
    items.filter((i) => i.defaultExpanded).map((i) => i.id)
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      if (expandedIds.includes(id)) {
        setExpandedIds(expandedIds.filter((item) => item !== id));
      } else {
        setExpandedIds([...expandedIds, id]);
      }
    } else {
      setExpandedIds(expandedIds.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div>
                <span className="text-sm font-semibold block">{item.title}</span>
                {item.subtitle && <span className="text-xs text-slate-500 font-normal">{item.subtitle}</span>}
              </div>
              <ChevronDown
                className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180 text-brand-600' : ''
                }`}
              />
            </button>
            {isExpanded && (
              <div className="p-4 pt-0 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40">
                {item.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
