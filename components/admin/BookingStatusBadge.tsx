import React from 'react';
import { BookingStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, CheckCheck, XCircle } from 'lucide-react';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="warning" className="gap-1.5 py-1 px-2.5">
          <Clock className="w-3 h-3" />
          <span>Menunggu Konfirmasi</span>
        </Badge>
      );
    case 'confirmed':
      return (
        <Badge variant="teal" className="gap-1.5 py-1 px-2.5 bg-teal-50 text-teal-800 border-teal-200">
          <CheckCircle2 className="w-3 h-3 text-teal-600" />
          <span>Terkonfirmasi</span>
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="success" className="gap-1.5 py-1 px-2.5">
          <CheckCheck className="w-3 h-3" />
          <span>Selesai Terapi</span>
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="destructive" className="gap-1.5 py-1 px-2.5">
          <XCircle className="w-3 h-3" />
          <span>Dibatalkan</span>
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}
