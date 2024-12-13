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

/* type Action =
    | { type: 'Create', value: UserProfile }
    | { type: 'Update', value: UserProfile }

class UserProfileContract {
    private lucid: Lucid
    private scriptAddress: string
    private script: Script

    constructor(lucid: Lucid, scriptPath: string) {
        this.lucid = lucid

        // Đọc script từ file .plutus
        const scriptJson = JSON.parse(fs.readFileSync(scriptPath, 'utf-8'))
        this.script = {
            type: 'PlutusV2',
            script: scriptJson.cborHex
        }

        // Tạo địa chỉ script
        this.scriptAddress = this.lucid.utils.validatorToAddress(this.script)
    }

    // Tạo profile mới
    async createProfile(profile: UserProfile) {
        const datum: Data = {
            owner: profile.owner,
            name: profile.name,
            avatar: profile.avatar,
            bio: profile.bio,
            birthday: profile.birthday,
            jointTime: profile.jointTime,
            address: profile.address
        }

        const tx = await this.lucid
            .newTx()
            .payToContract(
                this.scriptAddress,
                {
                    inline: datum
                },
                {}  // Giá trị ADA gửi kèm
            )
            .complete()

        const signedTx = await tx.sign().complete()
        return await signedTx.submit()
    }

    // Cập nhật profile
    async updateProfile(oldProfile: UserProfile, newProfile: UserProfile) {
        const oldDatum: Data = { ...oldProfile }
        const newDatum: Data = {
            ...newProfile,
            version: (oldProfile.version || 0) + 1
        }

        const tx = await this.lucid
            .newTx()
            .spendingPlutusV2ScriptTx()
            .spending({
                txHash: 'previous_tx_hash', // Hash của transaction chứa UTXO cũ
                outputIndex: 0  // Chỉ số output
            })
            .payToContract(
                this.scriptAddress,
                { inline: newDatum },
                {}
            )
            .complete()

        const signedTx = await tx.sign().complete()
        return await signedTx.submit()
    }
} */

// Sử dụng trong React Component
const UserProfileComponent = () => {
    const { lucid } = useLucid();
    /* const [contract, setContract] = useState<UserProfileContract | null>(null)

    const handleCreateProfile = async () => {
        if (!contract) return

        const newProfile: UserProfile = {
            owner: await lucid.wallet.address(),
            name: 'User Name',
            avatar: 'avatar_url',
            bio: 'User bio',
            birthday: '2000-01-01',
            jointTime: new Date().toISOString(),
            address: await lucid.wallet.address()
        }

        try {
            const txHash = await contract.createProfile(newProfile)
            console.log('Profile created:', txHash)
        } catch (error) {
            console.error('Error creating profile', error)
        }
    } */

    return (
        <button>
            Create Profile
        </button>
    )
}

export default UserProfileComponent