"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "relative w-full max-w-sm rounded-lg p-4 shadow-lg flex items-start",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200",
        destructive: "bg-red-50 border border-red-200 text-red-900",
        success: "bg-green-50 border border-green-200 text-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string
  title: string
  description?: string
  onDismiss?: (id: string) => void
}

export function Toast({
  id,
  title,
  description,
  variant,
  onDismiss,
}: ToastProps) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!isOpen && onDismiss) {
      const timer = setTimeout(() => onDismiss(id), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, id, onDismiss])

  if (!isOpen) return null

  return (
    <div className={cn(toastVariants({ variant }))}>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}