'use client';

import { useState, useEffect } from 'react';
import { useGetUserPosts } from '@/app/features/Post';
import PostCard from '@/app/components/posts/PostCard';
import { Spinner } from '@/app/components/shares/Spinner';

interface UserPostsProps {
    address: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ address }) => {
    const { data: posts, isLoading, error } = useGetUserPosts(address);

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

    if (!posts || posts.length === 0) {
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
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default UserPosts;