import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'ghost' | 'outline' | 'danger'
  className?: string
  type?: "button" | "submit" | "reset"
}

export const Button = ({ children, onClick, disabled, variant = 'primary', className = "", type = "button" }: ButtonProps) => {
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    ghost: "bg-transparent hover:bg-muted text-foreground",
    outline: "bg-transparent border border-border hover:bg-muted text-foreground",
    danger: "bg-red-500 text-white hover:bg-red-600 border-red-500",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex gap-2 items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none ring-offset-primary h-10 px-4 py-2 cursor-pointer ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};