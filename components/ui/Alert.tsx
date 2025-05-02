import { useState } from 'react';
import clsx from 'clsx';

export type AlertVariant = 'info' | 'error' | 'warning' | 'success' | 'loading';

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-blue-100 text-blue-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  success: 'bg-green-100 text-green-800',
  loading: 'bg-gray-100 text-gray-800'
};

type Props = {
  message: string;
  variant?: AlertVariant;
  onClose?: () => void;
  dismissible?: boolean;
};

export default function Alert({ message, variant = 'info', onClose, dismissible = true }: Props) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div
      className={clsx(
        'mt-4 w-full rounded py-3 px-5 text-center shadow flex items-center justify-center gap-2 relative',
        variantStyles[variant],
        dismissible && 'cursor-pointer'
      )}
      onClick={dismissible ? handleClose : undefined}
      title={dismissible ? 'Click to dismiss' : undefined}
      role="alert"
    >
      {variant === 'loading' && (
        <svg
          className="animate-spin h-5 w-5 text-inherit"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      <span className="">{message}</span>
      {dismissible && (
        <button
          className="absolute right-4 top-3 text-inherit bg-transparent border-none p-0 m-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}
