import './styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers/Providers';
import Navbar from './components/Navbar';
import { Toast } from './components/Toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>

          <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto p-4">
              {children}
            </main>
            <Toast />
          </div>
        </Providers>
      </body>
    </html>
  );
}