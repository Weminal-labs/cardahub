interface Post {
    author: string;        // address
    media: string;
    content: string;
    timestamp: bigint;   // uint256
    commentCount: bigint; // uint256
}

export type { Post };