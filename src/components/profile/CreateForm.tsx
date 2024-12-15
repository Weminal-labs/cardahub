// CreateProfileForm.tsx
import { useState, ChangeEvent } from 'react';
import { useLucid } from '../../context/LucidProvider';
import { Data } from 'lucid-cardano'
import { profileDatum } from '../../validators/datum';

interface CreateProfileFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateProfileForm: React.FC<CreateProfileFormProps> = ({ isOpen, onClose }) => {
    const { lucid, address } = useLucid();

    const [formData, setFormData] = useState({
        name: '',
        avatar: '',
        bio: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!lucid) {
                throw new Error("Lucid is not initialized");
            }

            if (!address) {
                throw new Error("Address not found");
            }

            const ownerPubKeyHash = await lucid?.utils.getAddressDetails(address).paymentCredential?.hash;

            if (!ownerPubKeyHash) {
                throw new Error("Owner public key hash not found");
            }

            const stringToHex = (str: string) => {
                return Array.from(new TextEncoder().encode(str))
                    .map(byte => byte.toString(16).padStart(2, '0'))
                    .join('');
            };

            const nameHex = stringToHex(formData.name);
            const avatarHex = stringToHex(formData.avatar);
            const bioHex = stringToHex(formData.bio);

            const datum = Data.to(
                {
                    owner: ownerPubKeyHash,
                    name: nameHex,
                    avatar: avatarHex,
                    bio: bioHex
                },
                profileDatum
            )

            const tx = await lucid.newTx()
                .payToContract("addr_test1qrdrt5djt6adwt40y4aqnxc64skyrcu74jhpm3vr670cdyd5293nx877ma7n26vrjum6z58up6ymm3h4ckd7dmdm0utqu5whad", { inline: datum }, { lovelace: BigInt(1) * 10n ** 4n })
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            console.log("Transaction Hash:", txHash);

        } catch (error) {
            console.error("Error creating profile:", error);
        }
        onClose();
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#0B0E14] border border-[#30363d] rounded-lg w-[90%] max-w-[500px] p-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-bold text-white mb-4">Create Profile</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#1C1E26] border border-[#30363d] rounded-lg p-2 text-gray-200 
                       placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Avatar CID
                        </label>
                        <input
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="w-full bg-[#1C1E26] border border-[#30363d] rounded-lg p-2 text-gray-200 
                       placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            placeholder="Enter avatar URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full bg-[#1C1E26] border border-[#30363d] rounded-lg p-2 text-gray-200 
                       placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                       resize-none min-h-[100px]"
                            placeholder="Tell us about yourself"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={!formData.name.trim()}
                            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 
                       disabled:cursor-not-allowed text-white rounded-full font-medium 
                       transition-colors duration-200"
                        >
                            Create Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProfileForm;