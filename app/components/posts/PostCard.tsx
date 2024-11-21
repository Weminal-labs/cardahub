'use client';

import Image from 'next/image';
import { timeStampToDate } from '@/utils/dateParse';
import { useGetPost } from '@/app/features/Post';
import { Spinner } from '../shares/Spinner';


interface PostCardProps {
    address: string;
    postId: number;
}

const PostCard: React.FC<PostCardProps> = ({ address, postId }) => {
    const { data, isLoading, error } = useGetPost(address, postId) as {
        data: readonly [`0x${string}`, string, string, bigint, bigint] | undefined,
        isLoading: boolean,
        error: Error | null
    };

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading post</div>;
    if (!data) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [author, content, media, timestamp, commentCount] = data;
    console.log('post', data);
    return (
        <div className="bg-light-primary dark:bg-dark-primary rounded-lg shadow-md overflow-hidden">
            {/* Author */}
            {/* <div className="p-4 border-b border-light-border dark:border-dark-border">
                <span className="text-sm text-light-text/70 dark:text-dark-text/70">
                    {author}
                </span>
            </div> */}

            {/* Media */}
            {media && media !== "" && (
                <div className="relative h-48 w-full">
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
                <p className="text-light-text dark:text-dark-text mb-2">
                    {content}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-light-text/70 dark:text-dark-text/70">
                    <span>
                        {timeStampToDate(Number(timestamp)).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
                        <span>💬 {commentCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;