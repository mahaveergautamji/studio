export function Spinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-[6px]',
  };
  return (
    <div
      className={`animate-spin rounded-full border-primary border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
