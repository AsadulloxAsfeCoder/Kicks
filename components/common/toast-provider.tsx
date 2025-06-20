// components/common/toast-provider.tsx
"use client"

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner"

export function Toaster() {
  return <SonnerToaster position="top-right" richColors />
}

export function useToast() {
  return {
    toast: sonnerToast,
    success: (message: string, description?: string) => {
      sonnerToast.success(message, { description })
    },
    error: (message: string, description?: string) => {
      sonnerToast.error(message, { description })
    },
    info: (message: string, description?: string) => {
      sonnerToast.info(message, { description })
    },
    warning: (message: string, description?: string) => {
      sonnerToast.warning(message, { description })
    },
  }
}