'use client';

import { ThemeProvider } from 'next-themes';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
    appName: 'Vent It',
    projectId: 'YOUR_PROJECT_ID', // Từ WalletConnect Cloud
    chains: [mainnet, sepolia],
    ssr: true,
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <WagmiProvider config={config}>
                    <RainbowKitProvider>
                        <ThemeProvider attribute="class">
                            <div className="min-h-screen bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text">
                                <main className="container mx-auto p-4">
                                    {children}
                                </main>
                            </div>
                        </ThemeProvider>
                    </RainbowKitProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}