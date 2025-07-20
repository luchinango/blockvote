import Provider from "@/components/provider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Provider web3authInitialState={undefined}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
