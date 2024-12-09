// Profile.tsx
interface User {
    avatar: string;
    name: string;
    username: string;
    bio: string;
    tweets: string[];
}

interface ProfileProps {
    user: User;
}

const Profile = ({ user }: ProfileProps) => {
    return (
        <div className="profile">
            <div className="profile-header">
                <img src={user.avatar} alt="Avatar" />
                <h2>{user.name}</h2>
                <p>@{user.username}</p>
                <p>{user.bio}</p>
            </div>
            <div className="tweets">
                <h3>Tweets</h3>
                <ul>
                    {user.tweets.map((tweet, index) => (
                        <li key={index}>{tweet}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
