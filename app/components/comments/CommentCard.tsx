'use client';

import { useGetComment } from "@/app/features/Post";
import { timeStampToDate } from "@/utils/dateParse";

interface CommentCardProps {
    globalId: number;
    commentId: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ globalId, commentId }) => {
    const { data: comment, isLoading, error } = useGetComment(globalId, commentId) as {
        data: readonly [`0x${string}`, string, string, bigint] | undefined,
        isLoading: boolean,
        error: Error | null
    };

    const [author, media, content, timestamp] = comment || [];

    if (isLoading) {
        return (
            <div className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg animate-pulse">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-light-border dark:bg-dark-border" />
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-light-border dark:bg-dark-border rounded" />
                        <div className="h-3 w-16 bg-light-border dark:bg-dark-border rounded" />
                    </div>
                </div>
                <div className="h-4 w-3/4 bg-light-border dark:bg-dark-border rounded mt-3" />
            </div>
        );
    }

    if (error || !comment) {
        return (
            <div className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg">
                <p className="text-red-500">Failed to load comment</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-lg hover:bg-light-secondary/80 dark:hover:bg-dark-secondary/80 transition-colors">
            {/* Author Section */}
            <div className="flex items-center gap-3 mb-2">
                {author}
                <div>
                    <h3 className="font-medium text-light-text dark:text-dark-text">
                        {media}
                    </h3>
                    <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                        {timeStampToDate(Number(timestamp)).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Content */}
            <p className="text-light-text dark:text-dark-text break-words">
                {content}
            </p>
        </div>
    );
};

export default CommentCard;