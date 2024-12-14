import { Lucid } from 'lucid-cardano';
import { useLucid } from '../context/LucidProvider';

type UserProfile = {
    owner: string, // VerificationKeyHash
    name: string,
    avatar: string,
    bio: string,
    birthday: string,
    jointTime: string,
    address: string
}


const UserProfileComponent = () => {
    const { lucid } = useLucid();

    const CreateProfile = () => {
        if (!lucid) return;

        const newProfile = {
            owner: "your_verification_key_hash", // VerificationKeyHash của người dùng
            name: "John Doe",
            avatar: "https://example.com/avatar.jpg",
            bio: "Lorem ipsum",
            birthday: "1990-01-01",
            jointTime: "2024-12-01",
            address: "your_cardano_address"
        };

        const tx = await lucid?.newTx()
            .attachSpendingValidator({
                type: "PlutusV2",
                script: script,
                datum: null,  // Datum là null khi tạo mới
                redeemer: { Create: newProfile }  // Gắn action là Create với dữ liệu hồ sơ người dùng
            })
            .complete();
    }

    return (
        <button>
            Create Profile
        </button>
    )
}

export default UserProfileComponent