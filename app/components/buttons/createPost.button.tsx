'use client';

import { useState } from 'react';
import { useCreatePost } from '@/app/features/Post';

export default function CreatePostButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    
    const { createPost, isPending } = useCreatePost(content, mediaUrl);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        
        try {
            await createPost();
            setContent('');
            setMediaUrl('');
            setIsOpen(false);
        } catch (err) {
            console.error('Failed to create post:', err);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Post
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-light-primary dark:bg-dark-primary p-4 rounded-lg w-96">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={mediaUrl}
                                onChange={(e) => setMediaUrl(e.target.value)}
                                placeholder="Media URL"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Content"
                                className="w-full p-2 border rounded"
                                rows={3}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending || !content.trim()}
                                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                                >
                                    {isPending ? 'Creating...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
