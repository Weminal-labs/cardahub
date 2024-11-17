interface Post {
    user: string;        // address
    media: string;
    content: string;
    timestamp: number;   // uint256
    commentCount: number; // uint256
    comments?: Post[];   // optional vì mapping không trả về trong response
}

export type { Post };