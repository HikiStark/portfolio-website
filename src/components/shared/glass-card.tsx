import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blue" | "dark";
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all sm:rounded-3xl sm:p-6",
        variant === "default" &&
          "border-multroid-grey/20 bg-multroid-white/70",
        variant === "blue" &&
          "border-multroid-blue/40 bg-multroid-blue/90 text-multroid-white",
        variant === "dark" &&
          "border-multroid-blue bg-multroid-glass-dark text-multroid-cream",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
