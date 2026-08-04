import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary:
      "bg-primary text-background hover:opacity-95 shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/20",
    secondary:
      "bg-accent text-white hover:bg-accent/90 shadow-sm shadow-accent/10 hover:shadow-md hover:shadow-accent/20",
    outline:
      "border border-border text-foreground hover:bg-surface hover:border-muted/30",
    ghost:
      "text-foreground hover:bg-surface",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
