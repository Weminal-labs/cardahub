import getValidator from '../validators/profileValidator'
import { useLucid } from '../context/LucidProvider';

const oldProfile = {
    owner: "your_verification_key_hash",
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    bio: "Lorem ipsum",
    birthday: "1990-01-01",
    jointTime: "2024-12-01",
    address: "your_cardano_address"
};

const updatedProfile = {
    owner: "your_verification_key_hash",
    name: "John Doe Updated",
    avatar: "https://example.com/new-avatar.jpg",
    bio: "Updated bio",
    birthday: "1990-01-01",
    jointTime: "2024-12-01",
    address: "your_cardano_address"
};

const UserProfileComponent = () => {
    const { lucid } = useLucid();

    /* const CreateProfile = () => {
        try {
            if (!lucid) {
                throw new Error("Lucid is not initialized");
            }

            const validator = getValidator();

            // Tạo giao dịch với hành động
            const tx = await lucid
                .newTx()
                .attachSpendingValidator({
                    type: "PlutusV2",
                    script: validator.script,
                    datum = null,
                    redeemer = {Create : oldProfile}
                })
                .complete();

            // Ký và gửi giao dịch
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            console.log("Transaction Hash:", txHash);

        } catch (error) {
            return error;
        } 
    }*/


    return (
        <div className="bg-cyber-bg-secondary/30 p-6 rounded-lg border border-cyber-border">
            <h1 className="text-2xl font-bold text-cyber-accent-cyan mb-4">Profile</h1>
            <button>
                Create Profile
            </button>
        </div>
    )
}

export default UserProfileComponent