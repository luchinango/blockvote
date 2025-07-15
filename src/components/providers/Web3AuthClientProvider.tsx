"use client";

import { Web3AuthProvider } from "@web3auth/modal/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import web3AuthContextConfig from "@/context/web3authContextConfig";
import { ReactNode, useMemo } from "react";

// Cliente de consulta para React Query
const queryClient = new QueryClient();

export function Web3AuthClientProvider({ children }: { children: ReactNode }) {
  const configWithMetamask = useMemo(() => {
    if (typeof window === "undefined") return web3AuthContextConfig;

    try {
      const metamaskAdapter = new MetamaskAdapter({
        clientId: web3AuthContextConfig.web3AuthOptions.clientId,
        sessionTime: 3600,
        web3AuthNetwork: web3AuthContextConfig.web3AuthOptions.web3AuthNetwork,
        chainConfig: web3AuthContextConfig.chainConfig,
      });

      // Estructura correcta para integrar el adaptador
      return {
        ...web3AuthContextConfig,
        adapters: [metamaskAdapter],
      };
    } catch (error) {
      console.error("Error al inicializar adaptador MetaMask:", error);
      return web3AuthContextConfig;
    }
  }, []);

  // Este es el return que faltaba
  return (
    <Web3AuthProvider config={configWithMetamask}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Web3AuthProvider>
  );
}