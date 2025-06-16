"use client";
import { YandexMetrica } from "@/components/analytics/yandex-metrica";
import { ChildrenProps } from "@/types";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootProvider = ({ children }: ChildrenProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={new QueryClient()}>
        <YandexMetrica>{children}</YandexMetrica>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default RootProvider;
