'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary"
        >
            {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-dark-text" />
            ) : (
                <MoonIcon className="h-5 w-5 text-light-text" />
            )}
        </button>
    );
}