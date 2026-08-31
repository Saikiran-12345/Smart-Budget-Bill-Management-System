import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AlertCircle, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="inline-flex rounded-full bg-amber-100 dark:bg-amber-900/40 p-4 text-amber-600 dark:text-amber-400">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">404</h1>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The requested financial route or page view does not exist.
        </p>
        <div className="pt-2">
          <Button variant="primary" icon={<Home className="h-4 w-4" />} onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
