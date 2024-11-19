import { useReadContract, useWriteContract } from 'wagmi';
import { VentProfileABI } from '@/app/abis/VentProfile';
import dotenv from 'dotenv';
import { User } from '../types/user';
import { dateToTimeStamp } from '@/utils/dateParse';

dotenv.config();

export function useCreateUser() {
    const { writeContract, data, error, isPending } = useWriteContract();

    const createUser = async (username: string, bio: string, avatar: string, birthday: string) => {
        try {
            await writeContract({
                abi: VentProfileABI,
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                functionName: 'createUser',
                args: [username, bio, avatar, dateToTimeStamp(birthday)],
            });
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    };

    return {
        createUser,
        data,
        error,
        isPending
    };
}

export function useGetUser(address: string) {
    return useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: VentProfileABI,
        functionName: 'getUser',
        args: [address as `0x${string}`],
        query: {
            enabled: !!address,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            select: (data: any): User | null => {
                if (!data || data.length === 0) {
                    return null;
                }
                return {
                    name: data[0],
                    avatar: data[1],
                    bio: data[2],
                    birthday: Number(data[3]),
                    jointTime: Number(data[4]),
                    addr: data[5],
                    n_follower: Number(data[6]),
                    n_following: Number(data[7])
                };
            }
        }
    });
}