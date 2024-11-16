import { create } from 'zustand';

interface UserState {
    address: string | null;
    isConnected: boolean;
    balance: string | null;
    chainId: number | null;
    // Actions
    setUser: (address: string, chainId: number) => void;
    clearUser: () => void;
    setBalance: (balance: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    address: null,
    isConnected: false,
    balance: null,
    chainId: null,

    setUser: (address, chainId) => set({
        address,
        chainId,
        isConnected: true,
    }),

    clearUser: () => set({
        address: null,
        isConnected: false,
        balance: null,
        chainId: null,
    }),

    setBalance: (balance) => set({ balance }),
}));