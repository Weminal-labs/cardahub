'use client'

import { useTheme } from 'next-themes'
import iconLight from '../assets/Cardano-RGB_Logo-Icon-Blue.png'
import iconDark from '../assets/Cardano-RGB_Logo-Icon-White.png'

/*
how to use:
<div>
    <Spinner /> //medium size
    <Spinner size="sm" /> //small size
    <Spinner size="lg" /> //large size
    <Spinner className="mt-4" /> //custom class
</div>
*/

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
    const { theme } = useTheme()

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <img
                src={theme === 'dark' ? iconDark : iconLight}
                alt="Loading..."
                className={`animate-spin ${sizeClasses[size]}`}
            />
        </div>
    )
}

export default Spinner
