import * as React from "react"

interface BadgeProps {
  variant?: "default" | "outline"
  className?: string
  children: React.ReactNode
}

export const Badge = ({
  variant = "default",
  className = "",
  children,
}: BadgeProps) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    outline: "border border-gray-200 text-gray-800"
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
