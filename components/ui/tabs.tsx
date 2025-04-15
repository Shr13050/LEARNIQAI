// components/ui/tabs.tsx
import * as React from "react"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
  children: React.ReactNode
}

export const Tabs = ({
  value,
  onValueChange,
  className = "",
  children,
}: TabsProps) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({
  className = "",
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={`flex space-x-1 rounded-md bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  )
}

export const TabsTrigger = ({
  value,
  disabled = false,
  children,
}: {
  value: string
  disabled?: boolean
  children: React.ReactNode
}) => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs")
  }

  const { value: selectedValue, onValueChange } = context
  const isActive = selectedValue === value

  return (
    <button
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all
        ${isActive 
          ? "bg-white shadow-sm text-blue-700" 
          : "text-gray-600 hover:text-gray-900"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsContent must be used within Tabs")
  }

  const { value: selectedValue } = context

  if (selectedValue !== value) {
    return null
  }

  return <div>{children}</div>
}