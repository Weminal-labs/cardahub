import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from './components/ThemeToggle';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class">
                    <div className="min-h-screen bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text">
                        <nav className="p-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold">My App</h1>
                            <ThemeToggle />
                        </nav>
                        <main className="container mx-auto p-4">
                            {children}
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}