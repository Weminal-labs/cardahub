'use client';

import { dummyPosts } from "@/seeder/posts";

const Posts: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
                {dummyPosts.map((post) => (
                    <article
                        key={post.id}
                        className="
                            bg-light-secondary dark:bg-dark-secondary 
                            rounded-lg p-6 
                            shadow-sm
                            transition-all duration-300
                            hover:shadow-md
                        "
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                {post.title}
                            </h3>
                            <span className="text-sm text-light-text/60 dark:text-dark-text/60">
                                {post.timestamp}
                            </span>
                        </div>

                        <p className="text-light-text dark:text-dark-text mb-4">
                            {post.content}
                        </p>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-light-text/70 dark:text-dark-text/70">
                                Posted by: {post.author}
                            </div>

                            <div className="flex gap-2">
                                <button className="
                                    px-4 py-2 
                                    bg-light-accent dark:bg-dark-accent 
                                    text-white 
                                    rounded-lg
                                    hover:opacity-90
                                    transition-opacity
                                ">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Posts;