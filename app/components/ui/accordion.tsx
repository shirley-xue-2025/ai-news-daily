import { cn } from '../../lib/utils';
import React from 'react';

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: 'single' | 'multiple';
    collapsible?: boolean;
  }
>(({ className, type = 'single', collapsible = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('space-y-2', className)}
      data-type={type}
      data-collapsible={collapsible}
      {...props}
    />
  );
});
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('border rounded-md', className)}
      data-value={value}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'flex w-full justify-between items-center font-medium text-left p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-800',
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ui-open:rotate-180"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden text-sm transition-all',
        'p-4 pt-0 ui-open:animate-accordion-down ui-closed:animate-accordion-up',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }; 