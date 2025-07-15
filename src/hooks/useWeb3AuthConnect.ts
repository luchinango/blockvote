import { useWeb3Auth } from "@/context/web3authContext";
import { useState, useEffect } from "react";

export function useWeb3AuthConnect() {
  const { web3auth, initialized } = useWeb3Auth();
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (web3auth && initialized) {
        try {
          // Verifica si hay sesión activa realmente
          const userInfo = await web3auth.getUserInfo();
          setIsConnected(!!userInfo); // Solo true si hay usuario
        } catch {
          setIsConnected(false);
        }
      } else {
        setIsConnected(false);
      }
    };
    checkConnection();
  }, [web3auth, initialized]);

  const connect = async () => {
    if (!initialized || !web3auth || !web3auth.loginModal) {
      setError(new Error("Web3Auth modal not initialized yet"));
      return;
    }
    setLoading(true);
    try {
      await web3auth.connect();
      const userInfo = await web3auth.getUserInfo();
      setIsConnected(!!userInfo);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      if (web3auth && web3auth.provider) {
        await web3auth.logout();
      } else {
        localStorage.removeItem("openlogin_store");
        localStorage.removeItem("Web3Auth-cachedAdapter");
      }
      setIsConnected(false);
    } catch (err) {
      setIsConnected(false);
    }
  };

  return { isConnected, connect, logout, loading, error };
}