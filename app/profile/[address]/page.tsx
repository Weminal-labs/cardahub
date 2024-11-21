'use client'

import { useParams } from 'next/navigation';
import UserProfile from '@/app/components/profiles/UserProfile';
import UserPosts from '@/app/components/posts/Posts';
import { UserContext } from '@/app/providers/UserProvider';
import { useContext } from 'react';

export default function ProfilePage() {
    const params = useParams();
    const address = params.address; // Lấy address từ URL
    const { userState } = useContext(UserContext);
    const { addr } = userState;

    if (!address) {
        return <div>Loading...</div>; // Hoặc xử lý loading state khác
    }

    const isOwnProfile = (address === addr);
    console.log('page param: ', address);
    return (
        <div className="container mx-auto py-8">
            <UserProfile address={address as string} isOwnProfile={isOwnProfile} />
            <UserPosts address={address as string} />
        </div>

    );
}