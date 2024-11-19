'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect } from 'react';

interface LightboxProps {
    imageUrl: string;
    onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ imageUrl, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>
                <div
                    className="relative w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={imageUrl}
                        alt="Avatar Lightbox"
                        width={800}
                        height={800}
                        className="object-contain rounded-lg"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};