"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

// Crear el contexto
interface Web3AuthContextType {
  web3auth: Web3Auth | null;
  initialized: boolean;
  error: Error | null;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3auth: null,
  initialized: false,
  error: null,
});

export const useWeb3Auth = () => useContext(Web3AuthContext);

// Provider personalizado
export function CustomWeb3AuthProvider({ children, config }: any) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Configurar el provider Ethereum con currentChain
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: {
            chainConfig: {
              ...config.chainConfig,
              chainNamespace: CHAIN_NAMESPACES.EIP155,
            },
          },
        });

        // En versiones recientes se usa el constructor en lugar de initModal
        const w3a = new Web3Auth({
          ...config.web3AuthOptions,
          chainConfig: config.chainConfig,
          web3AuthNetwork: config.web3AuthOptions.web3AuthNetwork,
          privateKeyProvider,
        });

        // Inicializar (ya no se usa initModal)
        await w3a.init();
        setWeb3auth(w3a);
        setInitialized(true);
      } catch (err: any) {
        console.error("Error inicializando Web3Auth:", err);
        setError(err);
      }
    };

    init();
  }, [config]);

  if (error) {
    return <div>Error al inicializar Web3Auth: {error.message || String(error)}</div>;
  }

  return (
    <Web3AuthContext.Provider value={{ web3auth, initialized, error }}>
      {children}
    </Web3AuthContext.Provider>
  );
}