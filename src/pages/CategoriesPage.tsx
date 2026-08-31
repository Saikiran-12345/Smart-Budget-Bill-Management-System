import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { useApp } from '../context/AppContext';
import { CategoryService } from '../services/categoryService';
import { formatCurrency } from '../math/formatters';
import { Tags, Plus, Edit2, Trash2, Power } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, refreshAllData } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catLimit, setCatLimit] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) return;

    CategoryService.add({
      name: catName,
      description: catDesc,
      iconName: 'Tags',
      colorHex: '#3b82f6',
      bgHex: '#eff6ff',
      budgetLimitMonthly: catLimit ? parseFloat(catLimit) : undefined,
    });
    refreshAllData();
    setIsModalOpen(false);
    setCatName('');
    setCatDesc('');
    setCatLimit('');
  };

  const handleToggle = (id: string) => {
    CategoryService.toggleStatus(id);
    refreshAllData();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Categories"
        description="Manage default system categories, add custom expense tags, and set monthly budget caps."
        action={
          <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
            Add Custom Category
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card key={cat.id} className={!cat.isEnabled ? 'opacity-60 bg-slate-50 dark:bg-slate-900/40' : ''}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2.5" style={{ backgroundColor: cat.bgHex, color: cat.colorHex }}>
                  <Tags className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{cat.name}</h3>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(cat.id)}
                className={`p-1.5 rounded-lg ${cat.isEnabled ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}
                title="Toggle Category"
              >
                <Power className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Monthly Cap:</span>
              <span className="text-slate-900 dark:text-slate-100">
                {cat.budgetLimitMonthly ? formatCurrency(cat.budgetLimitMonthly) : 'No Cap Set'}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Expense Category">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Category Name *" value={catName} onChange={(e) => setCatName(e.target.value)} required />
          <Input label="Description" value={catDesc} onChange={(e) => setCatDesc(e.target.value)} />
          <Input label="Monthly Budget Cap (₹)" type="number" value={catLimit} onChange={(e) => setCatLimit(e.target.value)} />
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
