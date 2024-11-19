'use client';

import { ThemeProvider } from 'next-themes';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './UserProvider';


const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
const config = getDefaultConfig({
  appName: 'Vent It',
  projectId: projectId || '',
  chains: [mainnet, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
