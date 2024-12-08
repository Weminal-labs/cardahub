import { createContext } from 'react';
import { User } from '@/src/types/user';


export interface UserState {
    name: User['name'] | null;
    avatar: User['avatar'] | null;
    bio: User['bio'] | null;
    birthday: User['birthday'] | null;
    jointTime: User['jointTime'] | null;
    addr: User['addr'] | null;
    n_follower: User['n_follower'] | null;
    n_following: User['n_following'] | null;
    isConnected: boolean;
    balance: string | null;
    chainId: number | null;
}

export const defaultUserState: UserState = {
    name: null,
    avatar: null,
    bio: null,
    birthday: null,
    jointTime: null,
    addr: null,
    n_follower: null,
    n_following: null,
    isConnected: false,
    balance: null,
    chainId: null,
};

export const UserContext = createContext<UserState>(defaultUserState);

