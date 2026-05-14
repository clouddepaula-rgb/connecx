export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg-deep z-[9999]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        {/* Texto opcional para dar feedback de que está conectando aos dados */}
        <span className="text-text-muted text-sm font-medium tracking-wide animate-pulse">
          Preparando experiência premium...
        </span>
      </div>
    </div>
  )
}
