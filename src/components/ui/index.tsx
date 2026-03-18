import React from "react";

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}
export function Card({ children, className = "", padding = true }: CardProps) {
  return (
    <div
      className={[
        "rounded-xl border border-surface-3 bg-surface-1",
        padding ? "p-6" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-3 text-gray-300",
  success: "bg-brand-500/20 text-brand-400",
  warning: "bg-yellow-500/20 text-yellow-400",
  danger:  "bg-red-500/20 text-red-400",
  info:    "bg-blue-500/20 text-blue-400",
};
export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-body ${badgeStyles[variant]}`}
    >
      {children}
    </span>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg
      className="animate-spin text-brand-400"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-80" />
    </svg>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ message = "No data found." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-3">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-30">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="text-sm font-body">{message}</p>
    </div>
  );
}

// ─── Error Message ────────────────────────────────────────────────────────────
export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 font-body">
      {message}
    </div>
  );
}
