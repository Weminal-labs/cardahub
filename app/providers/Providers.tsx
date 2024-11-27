'use client';

import { ThemeProvider } from 'next-themes';
import { http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './UserProvider';
import {
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
/* const config = getDefaultConfig({
  appName: 'Vent It',
  projectId: projectId || '',
  chains: [mainnet, sepolia],
  ssr: true,
}); */
const { wallets } = getDefaultWallets();
const config = getDefaultConfig({
  appName: 'Vent',
  projectId: 'ab4ba6e4b7b07a23c102eb73ac377d93' || '',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    sepolia
  ],
  transports: {
    [mainnet.id]: http('https://rpc.ankr.com/eth'),
    [sepolia.id]: http('https://rpc.ankr.com/eth_sepolia'),
  },
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
