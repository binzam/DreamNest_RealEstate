import './Container.css';
import { ReactNode } from 'react';

const Container = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;
