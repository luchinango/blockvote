import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { CustomWeb3AuthProvider } from "@/context/web3authContext";
import web3AuthContextConfig from "@/context/web3authContextConfig";

export const metadata: Metadata = {
  title: 'Voto Seguro CABLOCK',
  description: 'Votación electrónica segura para la elección del Directorio de la Cámara Boliviana de Blockchain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
          <CustomWeb3AuthProvider config={web3AuthContextConfig}>
            {children}
          </CustomWeb3AuthProvider>
          <Toaster />
      </body>
    </html>
  );
}
