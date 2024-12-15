import { MyNFTs } from '../NFTMarket/MyNFTs';
import { useState } from 'react';
import CreateProfileForm from './CreateForm';


const UserProfileComponent = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="relative bg-cyber-bg-secondary/30 p-6 rounded-lg border border-cyber-border">
            <h1 className="text-2xl font-bold text-cyber-accent-cyan mb-4">Profile</h1>
            <div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-6 py-3 bg-cyber-bg-secondary border border-cyber-border
              hover:bg-cyber-bg-tertiary/50 hover:border-cyber-accent-cyan
              rounded-lg text-cyber-text-primary
              transition-all duration-200 ease-in-out
              flex items-center gap-2 group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-cyber-accent-cyan group-hover:rotate-90 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>You don't have profile, click here to create</span>
                </button>

                <CreateProfileForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                />
            </div>

            <MyNFTs />
        </div>
    );
}

export default UserProfileComponent;