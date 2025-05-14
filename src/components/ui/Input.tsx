import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', fullWidth = true, ...props }, ref) => {
    const inputStyles = `
      block px-4 py-2 w-full 
      bg-dark-400 border border-dark-300 
      text-white placeholder-gray-400 
      rounded-md focus:outline-none 
      focus:ring-2 focus:ring-primary-500 
      focus:border-transparent
      ${error ? 'border-error focus:ring-error' : 'border-dark-300'}
      ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `;

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`${widthClass} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-200 mb-1">
            {label}
          </label>
        )}
        <input ref={ref} className={inputStyles} {...props} />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;