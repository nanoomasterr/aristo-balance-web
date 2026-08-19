import React from 'react';
import { BookingStatus, PaymentStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, CheckCheck, XCircle, DollarSign, CreditCard } from 'lucide-react';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="warning" className="gap-1 py-0.5 px-2 text-[11px]">
          <Clock className="w-3 h-3" />
          <span>Pending</span>
        </Badge>
      );
    case 'confirmed':
      return (
        <Badge variant="teal" className="gap-1 py-0.5 px-2 text-[11px] bg-teal-50 text-teal-800 border-teal-200">
          <CheckCircle2 className="w-3 h-3 text-teal-600" />
          <span>Confirmed</span>
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="success" className="gap-1 py-0.5 px-2 text-[11px]">
          <CheckCheck className="w-3 h-3" />
          <span>Completed</span>
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="destructive" className="gap-1 py-0.5 px-2 text-[11px]">
          <XCircle className="w-3 h-3" />
          <span>Cancelled</span>
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  method?: string | null;
}

export function PaymentStatusBadge({ status, method }: PaymentStatusBadgeProps) {
  switch (status) {
    case 'paid_in_clinic':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
          <span>Lunas {method ? `(${method.toUpperCase()})` : ''}</span>
        </span>
      );
    case 'dp_paid':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
          <DollarSign className="w-2.5 h-2.5 text-teal-600" />
          <span>DP Terbayar</span>
        </span>
      );
    case 'refunded':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
          <span>Refund</span>
        </span>
      );
    case 'unpaid':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="w-2.5 h-2.5 text-amber-600" />
          <span>Belum Bayar</span>
        </span>
      );
  }
}

