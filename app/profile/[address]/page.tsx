import UserPosts from '@/app/components/posts/Posts';
import UserProfile from '@/app/components/profiles/UserProfile';

export default function ProfilePage({ params }: { params: { address: string } }) {
    return (
        <div className="container mx-auto py-8">
            <UserProfile />
            <UserPosts address={params.address} />
        </div>
    );
}