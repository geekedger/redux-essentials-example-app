// src/components/ui/SmallButton.tsx
import { ReactNode, MouseEvent } from 'react';

interface SmallButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
}

const SmallButton = ({ children, onClick, ariaLabel }: SmallButtonProps) => (
  <button
    className="inline-block bg-button text-white rounded-sm font-bold px-lg py-sm m-1 max-sm:px-2 max-sm:py-2"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default SmallButton;