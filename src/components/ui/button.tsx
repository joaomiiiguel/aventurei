import { ReactNode } from "react";

export const Button = ({ children, onClick, className = "" }: { children: ReactNode, onClick: () => void, className?: string }) => {
  return (
    <button onClick={onClick} className={`inline-flex gap-2 items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer ${className}`}>
      {children}
    </button>
  );
};