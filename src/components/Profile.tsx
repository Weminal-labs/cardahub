import getValidator from '../validators/profileValidator';
import { useLucid } from '../context/LucidProvider';
import { MyNFTs } from './NFTMarket/MyNFTs';

const oldProfile = {
    owner: "your_verification_key_hash", // Replace with actual verification key hash
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    bio: "Lorem ipsum",
    birthday: "1990-01-01",
    jointTime: "2024-12-01",
    address: "your_cardano_address" // Replace with actual Cardano address
};

const UserProfileComponent = () => {
    const { lucid } = useLucid();

    const CreateProfile = async () => {
        try {
            if (!lucid) {
                throw new Error("Lucid is not initialized");
            }

            const validator = getValidator();
            const contractAddress = lucid.utils.validatorToAddress(validator);
            const utxos = await lucid.wallet.getUtxos();

            console.log("utxos: ", utxos);
            // Ensure you have UTXOs to collect
            if (utxos.length === 0) {
                throw new Error("No UTXOs available to collect");
            }

            const redeemer = JSON.stringify({ Create: oldProfile });
            const tx = await lucid.newTx()
                .collectFrom(utxos, redeemer) // Collect UTXOs and specify the action
                .addSigner(await lucid.wallet.address()) // Add the signer
                .complete(); // Complete the transaction

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            console.log("Transaction Hash:", txHash);

        } catch (error) {
            console.error("Error creating profile:", error);
        }
    }

    return (
        <div className="bg-cyber-bg-secondary/30 p-6 rounded-lg border border-cyber-border">
            <h1 className="text-2xl font-bold text-cyber-accent-cyan mb-4">Profile</h1>
            <button onClick={CreateProfile} className="bg-cyber-accent-cyan text-white p-2 rounded">
                Create Profile
            </button>

            <MyNFTs />
        </div>
    );
}

export default UserProfileComponent;