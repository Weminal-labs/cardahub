'use client';

import { useGetPostCount, useGetPost } from '@/app/features/Post';
import { Spinner } from '@/app/components/shares/Spinner';
import PostCard from './PostCard';

interface UserPostsProps {
    address: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ address }) => {
    const { data: postCount, isLoading, error } = useGetPostCount(address);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-light-text/70 dark:text-dark-text/70">
                Failed to load posts
            </div>
        );
    }

    if (!postCount || Number(postCount) === 0) {
        return (
            <div className="text-center py-8 text-light-text/70 dark:text-dark-text/70">
                No posts yet
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                Posts
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: Number(postCount) }, (_, index) => (
                    <PostItem key={index} address={address} postId={index} />
                ))}
            </div>
        </div>
    );
};

// Tách thành component riêng để mỗi post có thể load độc lập
const PostItem = ({ address, postId }: { address: string; postId: number }) => {
    const { data, isLoading } = useGetPost(address, postId);

    if (isLoading) {
        return <div className="h-48 animate-pulse bg-light-border dark:bg-dark-border rounded-lg" />;
    }

    if (!data) {
        return null;
    }

    return <PostCard address={address} postId={postId} />;
};

export default UserPosts;