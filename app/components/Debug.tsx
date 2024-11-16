'use client';

import { useUserStore } from '@/app/stores/useUserStore';

export const Debug: React.FC = () => {
    const state = useUserStore();

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg">
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
};