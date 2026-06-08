'use client';

import React, { forwardRef } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Current value of the input */
  value: string;
  /** Callback fired when the input value changes */
  onChange: (value: string) => void;
  /** Placeholder text shown when the input is empty */
  placeholder?: string;
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Size of the input field */
  size?: 'sm' | 'md' | 'lg';
  /** HTML input type */
  type?: 'text' | 'password' | 'email' | 'number';
}

const sizeStyles: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const labelSizeStyles: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder = '',
      label,
      error,
      disabled = false,
      size = 'md',
      type = 'text',
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={['font-medium text-gray-700', labelSizeStyles[size]].join(' ')}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            'rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
            sizeStyles[size],
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
            disabled ? 'cursor-not-allowed bg-gray-100 opacity-50' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
