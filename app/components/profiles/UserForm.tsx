import { useState, useEffect } from 'react';
import { useCreateUser, useUpdateUser } from '@/app/features/User';
import toast from 'react-hot-toast';

interface UserFormProps {
    onClose: () => void;
    mode?: 'create' | 'update';
    initialData?: {
        name: string;
        avatar: string;
        bio: string;
        birthday: Date;
    };
}

const UserForm: React.FC<UserFormProps> = ({ onClose, mode = 'create', initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        avatar: '',
        bio: '',
        birthday: ''
    });

    // Load initial data khi ở chế độ update
    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData({
                name: initialData.name || '',
                avatar: initialData.avatar || '',
                bio: initialData.bio || '',
                birthday: new Date(Number(initialData.birthday)).toISOString().split('T')[0] || ''
            });
        }
    }, [mode, initialData]);

    const { createUser, isPending: isCreating } = useCreateUser();
    const { updateUser, isPending: isUpdating } = useUpdateUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (mode === 'create') {
                await createUser(
                    formData.name,
                    formData.avatar,
                    formData.bio,
                    formData.birthday
                );
                toast.success('Profile created successfully!');
            } else {
                await updateUser(
                    formData.name,
                    formData.avatar,
                    formData.bio,
                    formData.birthday
                );
                toast.success('Profile updated successfully!');
            }
            onClose();
        } catch (error) {
            toast.error(`Failed to ${mode} profile`);
            console.error(error);
        }
    };

    const isPending = mode === 'create' ? isCreating : isUpdating;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-dark-primary rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
                    {mode === 'create' ? 'Create Profile' : 'Update Profile'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                            Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-light-accent dark:border-dark-accent bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                            Avatar URL
                        </label>
                        <input
                            type="url"
                            value={formData.avatar}
                            onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-light-accent dark:border-dark-accent bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-light-accent dark:border-dark-accent bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                            Birthday
                        </label>
                        <input
                            type="date"
                            value={formData.birthday}
                            onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-light-accent dark:border-dark-accent bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text"
                        />
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                        >
                            {isPending
                                ? (mode === 'create' ? 'Creating...' : 'Updating...')
                                : (mode === 'create' ? 'Create Profile' : 'Update Profile')
                            }
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-light-accent dark:border-dark-accent text-light-text dark:text-dark-text rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;