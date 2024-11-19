import { useReadContract, useWriteContract } from 'wagmi';
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
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PROFILE as `0x${string}`,
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

export function useDeleteUser() {
    const { writeContract, data, error, isPending } = useWriteContract();

    const deleteUser = async () => {
        try {
            console.log('Attempting to delete user...');

            const tx = await writeContract({
                abi: VentProfileABI,
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PROFILE as `0x${string}`,
                functionName: 'deleteUser',
                // Không cần truyền args nữa
                args: [],
            });

            console.log('Transaction submitted:', tx);
        } catch (err) {
            console.error('Detailed error:', err);
            throw err;
        }
    };

    return {
        deleteUser,
        data,
        error,
        isPending
    }
}

export function useUpdateUser() {
    const { writeContract, data, error, isPending } = useWriteContract();
    const updateUser = async (username: string, bio: string, avatar: string, birthday: string) => {
        try {
            await writeContract({
                abi: VentProfileABI,
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PROFILE as `0x${string}`,
                functionName: 'updateUser',
                args: [username, bio, avatar, dateToTimeStamp(birthday)],
            });
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    };

    return {
        updateUser,
        data,
        error,
        isPending
    }
}

export function useGetUser(address: string) {
    const { data, error, isLoading, isError } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PROFILE as `0x${string}`,
        abi: VentProfileABI,
        functionName: "getUser",
        args: [address],
    });

    return {
        data,
        error,
        isLoading,
        isError,
    }
}