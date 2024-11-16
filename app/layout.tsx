'use client';

import './styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';

const config = getDefaultConfig({
  appName: 'Vent It',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, sepolia],
  ssr: true,
});

// Tạo một instance của QueryClient
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <RainbowKitProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="min-h-screen">
                  <Navbar />
                  <main className="container mx-auto p-4">
                    {children}
                  </main>
                </div>
              </ThemeProvider>
            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}