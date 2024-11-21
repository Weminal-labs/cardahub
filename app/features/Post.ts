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

export function useGetUserPosts(address: string, postId: number) {
    const { data, error, isLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POST as `0x${string}`,
        abi: VentPostABI,
        functionName: "getPost",
        args: [address as `0x${string}`, BigInt(postId)],
    });

    // Transform data if needed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processedPosts = data ? data.map((post: any) => ({
        id: post.id,
        content: post.content,
        imageUrl: post.imageUrl,
        timestamp: post.timestamp,
        author: post.author,
        likes: post.likes,
        // ... other post properties
    })) : [];

    return {
        data: processedPosts,
        error,
        isLoading
    };
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