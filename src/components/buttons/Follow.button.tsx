// FollowButton.tsx
import React, { useState } from 'react';

interface FollowButtonProps {
  userId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? `Unfollowed user ${userId}` : `Followed user ${userId}`);
  };

  return (
    <button onClick={toggleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
