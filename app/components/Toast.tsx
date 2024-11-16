'use client';

import { Toaster } from 'react-hot-toast';

export function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                className: 'bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text',
                duration: 3000,
                style: {
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                },
                success: {
                    iconTheme: {
                        primary: '#10B981',
                        secondary: 'white',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: 'white',
                    },
                },
            }}
        />
    );
}