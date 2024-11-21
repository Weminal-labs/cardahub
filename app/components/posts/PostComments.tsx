'use client';

import { useGetCommentCount } from "@/app/features/Post";
import { Spinner } from "../shares/Spinner";
import { useState, useEffect } from "react";
import { useAddComment } from "@/app/features/Post";
import { toast } from "react-hot-toast";

interface PostCommentsProps {
    isOpen: boolean;
    onClose: () => void;
    globalPostId: number;
    postId: number;
    address: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ isOpen, onClose, globalPostId, postId, address }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const { addComment, data, error, isPending } = useAddComment();
    const { data: commentCount, error: commentCountError, isLoading: commentCountLoading } = useGetCommentCount(globalPostId);

    useEffect(() => {
        if (data) {
            setCommentContent('');
            setShowCommentForm(false);
            toast.success('Comment posted successfully!');
        }
    }, [data]);

    if (!isOpen) return null;

    if (commentCountLoading) {
        return <Spinner />;
    }
    if (commentCountError) {
        return (
            <div className="fixed inset-0 z-50">
                <div className="fixed inset-0 bg-black/25 z-40" />
                <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                    <div className="w-[500px] bg-light-primary dark:bg-dark-primary rounded-lg p-6 shadow-xl text-center">
                        <h2 className="text-xl font-medium text-red-500 mb-4">Error Loading Comments</h2>
                        <p className="text-light-text/70 dark:text-dark-text/70 mb-6">
                            Sorry, we couldn&apos;t load the comments. Please try refreshing the page.
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleComment = async (content: string) => {
        addComment(address, postId, globalPostId, "", content);    
    }

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/25 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-2xl bg-light-primary dark:bg-dark-primary rounded-lg p-6 shadow-xl relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text"
                    >
                        ✕
                    </button>

                    <h2 className="text-lg font-medium text-light-text dark:text-dark-text mb-4">
                        Comments
                    </h2>

                    {/* Add Comment Section */}
                    <div className="mb-4">
                        {!showCommentForm ? (
                            <button 
                                onClick={() => setShowCommentForm(true)}
                                className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90"
                            >
                                Write a comment
                            </button>
                        ) : (
                            <div>
                                <textarea
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    className="w-full p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text border border-light-border dark:border-dark-border"
                                    placeholder="Add a comment..."
                                    rows={3}
                                />
                                <div className="flex gap-2 mt-2">
                                    <button 
                                        onClick={() => handleComment(commentContent)}
                                        disabled={isPending || !commentContent.trim()}
                                        className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isPending ? 'Posting...' : 'Post Comment'}
                                    </button>
                                    <button 
                                        onClick={() => setShowCommentForm(false)}
                                        disabled={isPending}
                                        className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                {error && (
                                    <p className="mt-2 text-red-500 text-sm">
                                        Failed to post comment. Please try again.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Comments List */}
                    {commentCount && Number(commentCount) > 0 && (
                        <div className="space-y-4">
                            <p className="text-light-text dark:text-dark-text">Loading comments...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostComments;