'use client'

export default function Home() {
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center flex-col gap-4">      
      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
        Cardahub
      </h1>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-fade-up">
          Community
        </p>
        <span className="text-sm text-gray-500 dark:text-gray-400 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          v0.0.1
        </span>
      </div>
    </div>
  );
}
