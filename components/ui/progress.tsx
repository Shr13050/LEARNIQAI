// components/ui/progress.tsx
import * as React from "react"

interface ProgressProps {
  value?: number
  className?: string
}

export const Progress = ({
  value = 0,
  className = "",
}: ProgressProps) => {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-full bg-blue-600 transition-all"
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}