import { useReadContracts, useWriteContract } from 'wagmi';
import { VentProfileABI } from '@/app/abis/VentProfile';
import dotenv from 'dotenv';
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
    const { data, error, isLoading, isError } = useReadContracts({
        contracts: [
            {
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: VentProfileABI,
                functionName: "users",
                args: [address],
            },
            {
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: VentProfileABI,
                functionName: "getUser",
                args: [address],
            }
        ]
    });

    console.log('Multicall results:', data);
    console.log('Multicall error:', error);

    return {
        data: data?.[1], // getUser result
        mappingData: data?.[0], // users mapping result
        error,
        isLoading,
        isError
    }
}