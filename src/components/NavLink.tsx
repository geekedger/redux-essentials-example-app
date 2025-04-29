// src/components/ui/NavLink.tsx
import { Link, LinkProps } from 'react-router-dom';
import { ReactNode } from 'react';

interface NavLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: ReactNode;
  className?: string;
}

const NavLink = ({ to, children, className = '', ...rest }: NavLinkProps) => (
  <Link
    to={to}
    className={`font-bold px-xl py-xs rounded-sm bg-nav-link text-white flex items-center hover:bg-nav-link-hover max-sm:px-2 max-sm:py-xs ml-3xl ${className}`}
    {...rest}
  >
    {children}
  </Link>
);

export default NavLink;