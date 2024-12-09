'use client';

import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text hover:opacity-90 transition-all"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}