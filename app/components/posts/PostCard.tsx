import Image from 'next/image';
import { timeStampToDate } from '@/utils/dateParse';
import { HeartIcon } from '@heroicons/react/24/outline';

interface PostCardProps {
    post: {
        id: string;
        content: string;
        imageUrl?: string;
        timestamp: number;
        author: string;
        likes: number;
    };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="bg-light-primary dark:bg-dark-primary rounded-lg shadow-md overflow-hidden">
            {/* Post Image */}
            {post.imageUrl && (
                <div className="relative h-48 w-full">
                    <Image
                        src={post.imageUrl}
                        alt="Post image"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {/* Post Content */}
            <div className="p-4">
                <p className="text-light-text dark:text-dark-text mb-2">
                    {post.content}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-light-text/70 dark:text-dark-text/70">
                    <span>
                        {timeStampToDate(post.timestamp).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
                        <HeartIcon className="w-5 h-5" />
                        <span>{post.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;