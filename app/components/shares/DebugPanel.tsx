'use client';

import { useUser } from '@/app/providers/UserProvider';
import { useState } from 'react';

const DebugPanel: React.FC = () => {
    const { userState } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mb-2 hover:bg-gray-700"
            >
                {isExpanded ? 'Hide' : 'Show'} Debug Panel
            </button>

            {/* Debug Panel Content */}
            {isExpanded && (
                <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-md">
                    <h3 className="text-lg font-bold mb-2">User State Debug</h3>
                    <div className="space-y-2">
                        {Object.entries(userState).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <span className="text-gray-400 text-sm">{key}</span>
                                <span className="font-mono text-sm break-all">
                                    {value === null
                                        ? 'null'
                                        : typeof value === 'boolean'
                                        ? value.toString()
                                        : value === undefined
                                        ? 'undefined'
                                        : typeof value === 'object'
                                        ? JSON.stringify(value)
                                        : value.toString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DebugPanel;
