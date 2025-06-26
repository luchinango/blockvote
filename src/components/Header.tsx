"use client";

import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Shield, Menu, Home, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push('/');
  };

  const navLinkClasses = (hrefs: string[]) => cn(
    "transition-colors hover:text-foreground text-sm font-medium",
    hrefs.some(href => pathname.startsWith(href)) ? "text-foreground" : "text-muted-foreground"
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center md:mr-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden mr-4"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú de navegación</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
               <nav className="grid gap-6 text-lg font-medium mt-6">
                 <Link
                   href="/elections"
                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                 >
                   <Home className="h-5 w-5" />
                   Procesos Electorales
                 </Link>
                 <Link
                   href="/admin/create"
                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                 >
                   <PlusCircle className="h-5 w-5" />
                   Crear Votación
                 </Link>
                 <Link
                   href="/admin/audit"
                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                 >
                   <Shield className="h-5 w-5" />
                   Auditoría
                 </Link>
               </nav>
            </SheetContent>
          </Sheet>
          <Link href="/elections" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M15 21v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"/><path d="M12 11.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"/><path d="M6 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2"/><path d="M18 15h-2"/></svg>
            <span className="font-bold sm:inline-block font-headline">
              Voto Seguro CABLOCK
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6 ml-6">
            <Link
                href="/elections"
                className={navLinkClasses(['/elections'])}
            >
                Procesos Electorales
            </Link>
            <Link
                href="/admin/create"
                className={navLinkClasses(['/admin/create'])}
            >
                Crear Votación
            </Link>
            <Link
                href="/admin/audit"
                className={navLinkClasses(['/admin/audit'])}
            >
                Auditoría
            </Link>
        </nav>

        {/* Logout Button */}
        <div className="flex w-full items-center justify-end">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
