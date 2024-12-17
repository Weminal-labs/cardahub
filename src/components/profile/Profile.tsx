import { useState } from 'react';
import CreateProfileForm from './CreateForm';
import { useLucid } from '../../context/LucidProvider';
import { MintTokenValidator } from '../NFTMarket/MintTokenValidator';
import { SellNFT } from '../NFTMarket/SellNFT';

const UserProfileComponent = () => {
    const { lucid } = useLucid();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isMintModalOpen, setIsMintModalOpen] = useState(false);
    const user = {
        name: "Menhythien",
        avatar: "bafybeid73paqn45csdlw6zygi5xaneie6fdhvppv3pkfdwtez62lajwnjq",
        bio: "Menh on Cardano Hackathon 2024"
    }

    return (
        <div className="relative bg-cyber-bg-secondary/30 p-6 rounded-lg border border-cyber-border">
            <h1 className="text-2xl font-bold text-cyber-accent-cyan mb-4">Profile</h1>

            {!lucid ? (
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
            ) : (
                <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-cyber-accent-cyan 
                                        shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all duration-300
                                        group-hover:shadow-[0_0_25px_rgba(0,200,255,0.5)]">
                                <img
                                    src={`https://ipfs.io/ipfs/${user.avatar}`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-cyber-accent-cyan mb-2 
                                       tracking-wider font-mono">
                                {user.name}
                            </h2>
                            <p className="text-cyber-text-primary/80 font-light leading-relaxed 
                                      backdrop-blur-sm rounded-lg p-3 bg-cyber-bg-tertiary/20
                                      border border-cyber-border">
                                {user.bio}
                            </p>
                        </div>
                    </div>

                    {/* Stats or Additional Info */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {['Posts', 'Following', 'Followers'].map((stat) => (
                            <div key={stat}
                                className="text-center p-3 rounded-lg 
                                          bg-cyber-bg-tertiary/20 border border-cyber-border
                                          hover:border-cyber-accent-cyan transition-colors duration-200">
                                <div className="text-cyber-accent-cyan font-mono">0</div>
                                <div className="text-cyber-text-primary/60 text-sm">{stat}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {lucid && (
                <div className="mt-6">
                    <button
                        onClick={() => setIsMintModalOpen(true)}
                        className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 
                                 hover:from-purple-500/90 hover:to-blue-500/90 
                                 text-white font-bold py-3 px-8 rounded-lg 
                                 border border-white/30 transition-all duration-200 
                                 shadow-lg flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Mint NFT
                    </button>

                    {/* Mint Modal */}
                    {isMintModalOpen && (
                        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 
                                      flex items-center justify-center"
                            onClick={() => setIsMintModalOpen(false)}
                        >
                            <div
                                className="relative max-w-2xl w-full mx-4"
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-4 right-4 text-white/60 hover:text-white
                                             z-50 transition-colors duration-200"
                                    onClick={() => setIsMintModalOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <MintTokenValidator />
                            </div>
                        </div>
                    )}
                </div>
            )}
            <CreateProfileForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />

            {lucid && <SellNFT />}
        </div>
    );
}

export default UserProfileComponent;