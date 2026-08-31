import React from 'react';
import { Badge } from './Badge';

export interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toUpperCase();

  switch (normalized) {
    case 'PAID':
    case 'RECEIVED':
    case 'SUCCESSFUL':
    case 'COMPLETED':
      return <Badge variant="success">{status}</Badge>;
    case 'UPCOMING':
    case 'SCHEDULED':
    case 'PENDING':
    case 'IN_PROGRESS':
      return <Badge variant="warning">{status}</Badge>;
    case 'OVERDUE':
    case 'EXCEEDED':
    case 'DISPUTED':
    case 'FAILED':
      return <Badge variant="danger">{status}</Badge>;
    case 'CANCELLED':
    case 'ON_HOLD':
      return <Badge variant="neutral">{status}</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};
