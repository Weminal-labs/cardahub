interface User {
    name: string | null;
    avatar: string | null;
    bio: string | null;
    birthday: number | null;
    jointTime: number | null;
    addr: string | null;
    n_follower: number | null;
    n_following: number | null;
}

export type { User };