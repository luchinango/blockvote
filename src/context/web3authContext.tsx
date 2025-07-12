"use client";

import { createContext, useContext } from "react";
import { Web3Auth } from "@web3auth/modal";

const Web3AuthContext = createContext<Web3Auth | null>(null);

export function CustomWeb3AuthProvider({ children, config }: any) {
  const web3auth = new Web3Auth(config);
  return (
    <Web3AuthContext.Provider value={web3auth}>
      {children}
    </Web3AuthContext.Provider>
  );
}
// Reexporta los hooks
export function useWeb3Auth() {
  const context = useContext(Web3AuthContext);
  if (!context) throw new Error("useWeb3Auth must be used within CustomWeb3AuthProvider");
  return context;
}