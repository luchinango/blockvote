"use client";

import React from "react";
import { useWeb3Auth } from "@/context/web3authContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WelcomePage() {
  const { connected, connect, error } = useWeb3Auth() as { connected: boolean; connect: () => void; error?: { message: string } };
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  if (connected) {
    router.push("/elections");
    return null;
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-vote"><path d="M15 21v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"/><path d="M12 11.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"/><path d="M6 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2"/><path d="M18 15h-2"/></svg>
            </div>
            <CardTitle className="text-2xl font-headline">Voto Seguro CABLOCK</CardTitle>
            <CardDescription>
              Bienvenido al sistema de votación electrónica para la elección del Directorio de la Cámara Boliviana de Blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-muted-foreground text-sm p-4 bg-muted/50 rounded-lg">
              <p>Para continuar, por favor autentíquese firmando un mensaje con su wallet digital. Este proceso garantiza la seguridad e integridad de su voto.</p>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error de Autenticación</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            <Button onClick={connect} disabled={loading} className="w-full" size="lg">
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Wallet className="mr-2 h-5 w-5" />
              )}
              {loading ? "Conectando..." : "Ingresar con Web3Auth"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
