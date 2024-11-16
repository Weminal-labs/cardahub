'use client';

import { useEffect } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { useUserStore } from '@/app/stores/useUserStore';

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { data: balance } = useBalance({
        address: address as `0x${string}`,
    });

    const { setUser, clearUser, setBalance } = useUserStore();

    useEffect(() => {
        if (isConnected && address && chainId) {
            setUser(address, chainId);
        } else {
            clearUser();
        }
    }, [isConnected, address, chainId, setUser, clearUser]);

    useEffect(() => {
        if (balance) {
            setBalance(balance.formatted);
        }
    }, [balance, setBalance]);

    return <>{children}</>;
}