import type { Metadata } from 'next';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/Header/Header';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/QueryProvider';
import { getSession } from '@/lib/lib';
import { SessionProvider } from '@/providers/SessionProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Avikarta ',
  description: 'An Agent application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  console.log('layout ma vako session', session);

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <QueryProvider>
          <SessionProvider session={session}>
            <Header />
            {children}
            <Toaster
              toastOptions={{
                position: 'top-center',
                duration: 4000,
                error: {
                  style: {
                    backgroundColor: '#ffdede',
                    color: 'red',
                    fontSize: '0.9rem',
                  },
                },
                success: {
                  style: {
                    fontSize: '0.9rem',
                    color: 'green',
                    backgroundColor: '#edffef',
                  },
                },
                loading: {
                  style: { backgroundColor: '#fffded', color: 'darkorange' },
                },
              }}
            />
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
