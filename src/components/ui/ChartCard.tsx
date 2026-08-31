import React from 'react';
import { Card } from './Card';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  height?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  action,
  children,
  height = 'h-72',
}) => {
  return (
    <Card title={title} subtitle={subtitle} action={action}>
      <div className={`w-full ${height}`}>{children}</div>
    </Card>
  );
};
