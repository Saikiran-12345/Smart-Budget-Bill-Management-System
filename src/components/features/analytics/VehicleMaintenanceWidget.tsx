import React from 'react';
import { Card } from '../../ui/Card';
import { VehicleService } from '../../../services/vehicleService';
import { formatCurrency } from '../../../math/formatters';
import { Car, Fuel } from 'lucide-react';

export const VehicleMaintenanceWidget: React.FC = () => {
  const veh = VehicleService.getVehicleMaintenanceCost();

  return (
    <Card title="Vehicle Maintenance & Running Cost Per Km" subtitle="Fuel efficiency, servicing & per-kilometer running cost">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Vehicle Model</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">{veh.modelName}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Annual Running Cost</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(veh.totalAnnualOutflow)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Running Cost Per Km</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">₹{veh.runningCostPerKm}/km</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
