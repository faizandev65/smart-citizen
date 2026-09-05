import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border border-slate-200/80 bg-white transition-all duration-200',
          hoverEffect && 'hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1',
          glass && 'glass-card',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
