import { useDeleteUser } from '@/app/features/User';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';

export default function DeleteUserButton() {
    const { deleteUser, isPending } = useDeleteUser();
    const { address } = useAccount();

    const handleDeleteUser = async () => {
        if (!address) {
            toast.error('Please connect your wallet first');
            return;
        }

        try {
            console.log('Starting delete user process...');
            // Confirmation dialog
            if (!window.confirm('Are you sure you want to delete your profile?')) {
                return;
            }

            console.log('Calling deleteUser function...');
            await deleteUser();
            console.log('Delete user function completed');
            toast.success('Profile deleted successfully');
        } catch (error) {
            console.error('Error in handleDeleteUser:', error);
            toast.error('Failed to delete profile: ' + (error as Error).message);
        }
    };

    return (
        <button
            onClick={handleDeleteUser}
            disabled={isPending || !address}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all
                     flex items-center justify-center gap-2"
        >
            {isPending ? (
                <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Deleting...</span>
                </>
            ) : (
                <span>Delete Profile</span>
            )}
        </button>
    );
}
