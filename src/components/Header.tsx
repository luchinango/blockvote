"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWeb3AuthConnect, useWeb3AuthUser } from "@web3auth/modal/react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  
  const web3AuthConnect = useWeb3AuthConnect();
  const web3AuthUser = useWeb3AuthUser();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Verificar estado de conexión
  useEffect(() => {
    async function checkAuth() {
      try {
        const info = await web3AuthUser.getUserInfo();
        setIsConnected(!!info && Object.keys(info).length > 0);
      } catch {
        setIsConnected(false);
      }
    }
    
    checkAuth();
  }, [web3AuthUser]);
  
  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      // Limpiar localStorage como solución temporal
      localStorage.removeItem("openlogin_store");
      localStorage.removeItem("Web3Auth-cachedAdapter");
      window.location.href = "/"; // Forzar recarga completa
    } catch (error) {
      console.error("Error durante logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  const navLinkClasses = (hrefs: string[]) => cn(
    "transition-colors hover:text-foreground text-sm font-medium",
    hrefs.some(href => pathname?.startsWith(href)) ? "text-foreground" : "text-muted-foreground"
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {/* Contenido del menú móvil */}
            </SheetContent>
          </Sheet>
          
          <Link href="/elections" className="font-bold">Voto Seguro CABLOCK</Link>
          
          <nav className="hidden md:flex md:items-center gap-6 ml-6">
            <Link href="/elections" className={navLinkClasses(['/elections'])}>
              Procesos Electorales
            </Link>
            <Link href="/admin/create" className={navLinkClasses(['/admin/create'])}>
              Crear Votación
            </Link>
          </nav>
        </div>
        
        {/* Botón de logout */}
        {isConnected && (
          <Button 
            onClick={handleLogout} 
            variant="outline"
            size="sm"
            disabled={isLoggingOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </Button>
        )}
      </div>
    </header>
  );
}

// O alternativamente si usas export default:
// export default function Header() {
//   // ... código del componente
// }
