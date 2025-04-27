import { cn } from '../../lib/utils';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-gray-300 text-gray-600 dark:text-gray-100 bg-transparent',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge }; 