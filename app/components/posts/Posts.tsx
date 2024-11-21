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
        return <Spinner />;
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
        <div className="max-w-2xl mx-auto p-6 bg-light-primary dark:bg-dark-primary rounded-lg shadow-lg">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    Posts
                </h2>
                <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                    Total posts: {Number(postCount)}
                </p>
            </div>

            <div className="space-y-4">
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
        return (
            <div className="h-48 animate-pulse bg-light-border dark:bg-dark-border rounded-lg" />
        );
    }

    if (!data) {
        return null;
    }

    return <PostCard address={address} postId={postId} />;
};

export default UserPosts;