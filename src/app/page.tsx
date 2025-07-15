"use client";

import React, { useEffect, useState } from "react";
import { useWeb3AuthConnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WelcomePage() {
  const { connect, loading: connectLoading, error: connectError } = useWeb3AuthConnect();
  const web3AuthUser = useWeb3AuthUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Verificar autenticación al cargar - SOLO UNA VEZ
  useEffect(() => {
    if (!authChecked) {
      async function checkAuth() {
        try {
          setIsLoading(true);
          const info = await web3AuthUser.getUserInfo();
          console.log("Información del usuario:", info); // Ver qué contiene exactamente
          
          if (info && Object.keys(info).length > 0) {
            console.log("Usuario autenticado, guardando info y redireccionando");
            setUserInfo(info);
            setIsRedirecting(true); // Marcamos que debemos redireccionar
          } else {
            console.log("No hay información de usuario válida");
          }
        } catch (err) {
          console.error("Error al verificar autenticación:", err);
        } finally {
          setIsLoading(false);
          setAuthChecked(true);
        }
      }
      checkAuth();
    }
  }, [authChecked, web3AuthUser]);

  // Redirección separada en otro useEffect con dependencia en isRedirecting
  useEffect(() => {
    if (isRedirecting) {
      console.log("Redirigiendo a /elections");
      // Usamos setTimeout para asegurar que la redirección ocurra después del renderizado
      setTimeout(() => {
        router.push("/elections");
      }, 100);
    }
  }, [isRedirecting, router]);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await connect();
      const info = await web3AuthUser.getUserInfo();
      console.log("Usuario conectado:", info);
      setUserInfo(info);
      setIsRedirecting(true); // Activar redirección después de conectar
    } catch (err) {
      console.error("Error al conectar:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  // Añade esta función para conectar con MetaMask
  const handleMetaMaskConnect = async () => {
    try {
      setIsLoading(true);
      
      // En la versión actual, no podemos pasar el adaptador directamente
      // Web3Auth mostrará un modal donde el usuario puede elegir MetaMask
      await connect();
      
      // Una vez conectado, obtener la información
      const info = await web3AuthUser.getUserInfo();
      console.log("Usuario conectado con wallet:", info);
      setUserInfo(info);
      setIsRedirecting(true);
    } catch (err) {
      console.error("Error al conectar con MetaMask:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar pantalla de redirección si estamos redirigiendo
  if (isRedirecting) {
    return <div className="flex items-center justify-center h-screen">Redirigiendo a elecciones...</div>;
  }

  // Mostrar carga durante verificación inicial
  if (isLoading && !authChecked) {
    return <div className="flex items-center justify-center h-screen">Verificando autenticación...</div>;
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Voto Seguro CABLOCK</CardTitle>
            <CardDescription>
              Sistema de votación electrónica para la elección del Directorio de la Cámara Boliviana de Blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(error || connectError) && (
              <Alert variant="destructive">
                <AlertTitle>Error de Autenticación</AlertTitle>
                <AlertDescription>
                  {error?.message || connectError?.message || "Ocurrió un error al conectar"}
                </AlertDescription>
              </Alert>
            )}
            
            {/* Botón principal de Web3Auth */}
            <Button onClick={handleConnect} disabled={isLoading} className="w-full" size="lg">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <img src="/metamask-fox.svg" alt="MetaMask" className="h-5 w-5 mr-2" />
              )}
              {isLoading ? "Conectando..." : "Conectar con MetaMask"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}