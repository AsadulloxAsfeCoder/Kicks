// components/common/ClientWrapper.tsx
"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";
import { CookiesProvider } from "react-cookie";
import RootProvider from "@/components/common/provider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider>
      <RootProvider>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </RootProvider>
    </CookiesProvider>
  );
}
