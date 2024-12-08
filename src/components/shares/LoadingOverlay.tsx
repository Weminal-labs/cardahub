const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-light-accent dark:border-dark-accent"></div>
                <div>
                    <p className="text-light-text dark:text-dark-text">
                        Getting user data...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;