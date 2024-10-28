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
  klaytn,
  klaytnBaobab,
  mainnet, // import ethereum mainnet
  sepolia, // import sepolia testnet
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
// import theo hướng dẫn trong docs

const { wallets } = getDefaultWallets();
// khởi tạo và destructure wallets object
// Define the Unique chain
const uniqueChain = {
  id: 8880, // Sửa thành 8880 hoặc "0x22b0"
  name: "Unique",
  network: "unique",
  nativeCurrency: {
    name: "Unique",
    symbol: "UNQ",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.unique.network"],
      websocket: ["wss://ws.unique.network"],
    },
    public: {
      http: ["https://rpc.unique.network"],
      websocket: ["wss://ws.unique.network"],
    },
  },
  blockExplorers: {
    default: { name: "UniqueScan", url: "https://unique.subscan.io/" },
  },
  testnet: false,
};
// Define the Unique chain
const quartzMainnet = {
  id: 8881, // Sửa thành 8880 hoặc "0x22b0"
  name: "Quartz",
  network: "quartz",
  nativeCurrency: {
    name: "Quartz",
    symbol: "QTZ",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-quartz.unique.network"],
      websocket: ["wss://ws-quartz.unique.network"],
    },
    public: {
      http: ["https://rpc-quartz.unique.network"],
      websocket: ["wss://ws-quartz.unique.network"],
    },
  },
  blockExplorers: {
    default: { name: "Quartz", url: "https://quartz.subscan.io/" },
  },
  testnet: false,
};
// Define the Unique chain
const opalTestnet = {
  id: 8882, // Sửa thành 8880 hoặc "0x22b0"
  name: "Opal",
  network: "opal",
  nativeCurrency: {
    name: "Opal",
    symbol: "OPL",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-opal.unique.network"],
      websocket: ["wss://ws-opal.unique.network"],
    },
    public: {
      http: ["https://rpc-opal.unique.network"],
      websocket: ["wss://ws-opal.unique.network"],
    },
  },
  blockExplorers: {
    default: { name: "Opal", url: "https://opal.subscan.io/" },
  },
  testnet: true,
};
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
    sepolia,
    klaytn,
    klaytnBaobab,
    uniqueChain,
    quartzMainnet,
    opalTestnet,
  ],
  transports: {
    [8880]: http("https://rpc.unique.network"),
    [8881]: http("https://rpc-quartz.unique.network"),
    [8882]: http("https://rpc-opal.unique.network"),
    [mainnet.id]: http('https://rpc.ankr.com/eth'), // Lựa chọn RPC provider là Ankr thay vì mặc định
    [sepolia.id]: http('https://rpc.ankr.com/eth_sepolia'), // Lựa chọn RPC provider là Ankr thay vì mặc định
    [klaytn.id]: http('https://rpc.ankr.com/klaytn'),
    [klaytnBaobab.id]: http('https://rpc.ankr.com/klaytn_baobab'),
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