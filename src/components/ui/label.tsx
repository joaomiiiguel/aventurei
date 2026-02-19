const Label = ({ children, htmlFor, className = "" }: { children: React.ReactNode, htmlFor?: string, className?: string }) => (
    <label htmlFor={htmlFor} className={`text-sm font-semibold text-foreground mb-1 block ${className}`}>
        {children}
    </label>
)

export default Label