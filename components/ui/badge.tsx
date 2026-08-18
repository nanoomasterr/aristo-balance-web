import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' | 'teal';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantClasses = {
    default: 'bg-[#0F4C5C] text-white',
    teal: 'bg-[#0F4C5C]/10 text-[#0F4C5C] border border-[#0F4C5C]/20',
    secondary: 'bg-slate-100 text-slate-800',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    destructive: 'bg-rose-100 text-rose-800 border border-rose-200',
    outline: 'border border-slate-300 text-slate-700',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
