'use client';

import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title displayed at the top of the card */
  title: string;
  /** Short description displayed below the title */
  description?: string;
  /** URL of an image displayed at the top of the card */
  imageUrl?: string;
  /** Visual style variant of the card */
  variant?: 'default' | 'bordered' | 'elevated';
  /** Internal padding of the card */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether the card has a hover lift effect */
  hoverable?: boolean;
  /** Content rendered inside the card body */
  children?: React.ReactNode;
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-[var(--bg-primary)]',
  bordered: 'bg-[var(--bg-primary)] border border-[var(--border-color)]',
  elevated: 'bg-[var(--bg-primary)] shadow-lg',
};

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      imageUrl,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          'rounded-xl overflow-hidden transition-all duration-200',
          variantStyles[variant],
          hoverable ? 'hover:-translate-y-1 hover:shadow-md cursor-pointer' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-48 w-full object-cover"
          />
        )}
        <div className={paddingStyles[padding]}>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
          )}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
