import { useState, useEffect } from 'react';
import { useGetUser } from '@/app/features/User';
import { UserState } from '@/app/context/UserContext';

interface ConnectHandlerProps {
    address: string;
    balance: string;
    isConnecting: boolean;
    setIsConnecting: (value: boolean) => void;
    setUser: (user: Partial<UserState>) => void;
}

export function useConnectHandler({
    address,
    balance,
    isConnecting,
    setIsConnecting,
    setUser,
}: ConnectHandlerProps) {
    const [needsRerender, setNeedsRerender] = useState(false);
    const { data: userData, isLoading } = useGetUser(address);

    useEffect(() => {
        if (isConnecting && !address) {
            setNeedsRerender(true);
        }

        if (needsRerender && address && !isLoading) {
            setUser({
                name: userData?.name || null,
                avatar: userData?.avatar || null,
                bio: userData?.bio || null,
                birthday: userData?.birthday || null,
                jointTime: userData?.jointTime || null,
                n_follower: userData?.n_follower || null,
                n_following: userData?.n_following || null,
                addr: address,
                balance: balance,
                isConnected: true,
            });

            setIsConnecting(false);
            setNeedsRerender(false);
        }
    }, [address, balance, isConnecting, needsRerender, userData, isLoading, setUser, setIsConnecting]);

    return {
        isLoading,
        showLoading: isConnecting && isLoading
    };
}