import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Web3AuthClientProvider } from "@/components/providers/Web3AuthClientProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: 'Voto Seguro CABLOCK',
  description: 'Votación electrónica para la Cámara Boliviana de Blockchain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Web3AuthClientProvider>
          {/* Elimina temporalmente el Header para verificar si es el problema */}
          {/* <Header /> */}
          <main className="flex-1">{children}</main>
        </Web3AuthClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
