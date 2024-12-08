import { useContext, useState, ReactNode } from "react";

import { createContext } from "react";
import { defaultUserState } from "../context/UserContext";

import { UserState } from "../context/UserContext";

interface UserContextType {
    userState: UserState;
    setUser: (user: Partial<UserState>) => void;
    clearUser: () => void;
    setBalance: (balance: string) => void;
}

// Tạo context với type đã định nghĩa
export const UserContext = createContext<UserContextType>({
    userState: defaultUserState,
    setUser: () => {},
    clearUser: () => {},
    setBalance: () => {},
});

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
    const [userState, setUserState] = useState<UserState>(defaultUserState);

    const setUser = (user: Partial<UserState>) => {
        setUserState(prev => ({ ...prev, ...user }));
    };

    const clearUser = () => {
        setUserState(defaultUserState);
    };

    const setBalance = (balance: string) => {
        setUserState(prev => ({ ...prev, balance }));
    };

    return (
        <UserContext.Provider 
            value={{
                userState,
                setUser,
                clearUser,
                setBalance,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// Custom hook để sử dụng context
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}