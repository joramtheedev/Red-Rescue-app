import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-300 font-body"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "w-full rounded-lg bg-surface-2 border px-3 py-2.5 text-sm text-white",
          "placeholder:text-gray-500 font-body",
          "focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500",
          "transition-colors duration-150",
          error
            ? "border-red-500/70 focus:ring-red-500/40"
            : "border-surface-3 hover:border-gray-500",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-xs text-red-400 font-body">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500 font-body">{hint}</p>}
    </div>
  );
}
