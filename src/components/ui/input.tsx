export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  className?: string;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
};
