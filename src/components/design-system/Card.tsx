import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hoverable" | "flat";
  children: React.ReactNode;
}

export default function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const baseStyles = "bg-surface rounded-2xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    default: "border border-border soft-shadow",
    hoverable: "border border-border soft-shadow hover:border-accent/30 hover:shadow-lg hover:shadow-accent/[0.04] hover:-translate-y-0.5",
    flat: "border border-border",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
