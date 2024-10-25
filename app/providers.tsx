'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  mainnet, // import ethereum mainnet
  sepolia, // import sepolia testnet
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
// import theo hướng dẫn trong docs

const { wallets } = getDefaultWallets();
// khởi tạo và destructure wallets object

const config = getDefaultConfig({
  appName: 'vent_it', // Đặt tên cho app của bạn
  projectId: "b735f0d8b8e242fb3e26f7c8dd1062b1", // Nhập vào WalletConnect Project ID ở đây
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
    [mainnet.id]: http('https://rpc.ankr.com/eth'), // Lựa chọn RPC provider là Ankr thay vì mặc định
    [sepolia.id]: http('https://rpc.ankr.com/eth_sepolia'), // Lựa chọn RPC provider là Ankr thay vì mặc định
  },
  ssr: true, // Vì là App router của Nextjs thì bạn cần khai báo ssr là true
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}