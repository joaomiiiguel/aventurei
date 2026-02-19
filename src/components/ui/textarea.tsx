
const Textarea = ({ id, value, onChange, rows = 3, placeholder = "", className = "" }: { id?: string, value: string, onChange: (e: any) => void, rows?: number, placeholder?: string, className?: string }) => (
    <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
)

export default Textarea