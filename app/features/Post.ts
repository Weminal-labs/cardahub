import { useReadContract, useWriteContract } from 'wagmi';
import { VentPostABI } from '@/app/abis/VentPost';
import dotenv from 'dotenv';

dotenv.config();

export function useGetPostCount(address: string) {
    const { data, error, isLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POST as `0x${string}`,
        abi: VentPostABI,
        functionName: "getPostCount",
        args: [address as `0x${string}`],
    });

    return {
        data,
        error,
        isLoading
    }
}

export function useCreatePost(content: string, imageUrl: string) {
    const { writeContract, data, error, isPending } = useWriteContract();
    const createPost = async () => {
        await writeContract({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POST as `0x${string}`,
            abi: VentPostABI,
            functionName: "createPost",
            args: [content, imageUrl],
        });
    };

    return {
        createPost,
        data,
        error,
        isPending
    }
}

export function useGetPost(address: string, postId: number) {
    const { data, error, isLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POST as `0x${string}`,
        abi: VentPostABI,
        functionName: "getPost",
        args: [address as `0x${string}`, BigInt(postId)],
    });

    return {
        data,
        error,
        isLoading
    }
}

export function useAddComment() {
    const { writeContract, data, error, isPending } = useWriteContract();
    const addComment = async (postOwnerAddr: string, postId: number, globalPostId: number, media: string, content: string) => {
        await writeContract({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POST as `0x${string}`,
            abi: VentPostABI,
            functionName: "addComment",
            args: [postOwnerAddr as `0x${string}`, BigInt(postId), BigInt(globalPostId), media, content],
        });
    };

    return {
        addComment,
        data,
        error,
        isPending
    }
}

export function useGetCommentCount(globalPostId: number) {
    const { data, error, isLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POST as `0x${string}`,
        abi: VentPostABI,
        functionName: "getCommentCount",
        args: [BigInt(globalPostId)],
    });

    return {
        data,
        error,
        isLoading
    }
}

export function useGetComment(globalPostId: number, commentId: number) {
    const { data, error, isLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POST as `0x${string}`,
        abi: VentPostABI,
        functionName: "getComment",
        args: [BigInt(globalPostId), BigInt(commentId)],
    });

    return {
        data,
        error,
        isLoading
    }
}