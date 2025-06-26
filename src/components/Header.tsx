"use client";

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { LogOut, Vote } from 'lucide-react';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, this would clear tokens or session state
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/elections" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M15 21v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"/><path d="M12 11.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"/><path d="M6 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2"/><path d="M18 15h-2"/></svg>
            <span className="font-bold sm:inline-block font-headline">
              Voto Seguro CABLOCK
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
}
