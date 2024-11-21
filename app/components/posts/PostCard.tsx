'use client';

import Image from 'next/image';
import { timeStampToDate } from '@/utils/dateParse';
import { useGetPost } from '@/app/features/Post';
import { Spinner } from '../shares/Spinner';
import { useState } from 'react';
import PostComments from '../comments/Comments';

interface PostCardProps {
    address: string;
    postId: number;
}

const PostCard: React.FC<PostCardProps> = ({ address, postId }) => {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const { data, isLoading, error } = useGetPost(address, postId) as {
        data: readonly [bigint, `0x${string}`, string, string, bigint, bigint] | undefined,
        isLoading: boolean,
        error: Error | null
    };

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading post</div>;
    if (!data) return null;

    const [globalId, author, content, media, timestamp, commentCount] = data;

    return (
        <>
            <div
                className="bg-light-primary dark:bg-dark-primary rounded-lg shadow-md overflow-hidden border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent transition-colors cursor-pointer"
                onClick={() => setIsCommentsOpen(true)}
            >
                {/* Author */}
                <div className="p-4 border-b border-light-border dark:border-dark-border bg-light-secondary/30 dark:bg-dark-secondary/30">
                    <span className="text-sm text-light-text/70 dark:text-dark-text/70">
                        {`${author.slice(0, 6)}...${author.slice(-4)}`}
                    </span>
                </div>

                {/* Media */}
                {media && media !== "" && (
                    <div className="relative h-48 w-full border-b border-light-border dark:border-dark-border">
                        <Image
                            src={media}
                            alt="Post media"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="p-4">
                    <p className="text-light-text dark:text-dark-text mb-4">
                        {content}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-light-text/70 dark:text-dark-text/70 pt-2 border-t border-light-border dark:border-dark-border">
                        <span>
                            {timeStampToDate(Number(timestamp)).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1">
                            <span>💬 {Number(commentCount)} Comments</span>
                        </div>
                    </div>
                </div>
            </div>

            <PostComments
                isOpen={isCommentsOpen}
                onClose={() => setIsCommentsOpen(false)}
                globalPostId={Number(globalId)}
                postId={postId}
                address={address}
            />
        </>
    );
};

export default PostCard;