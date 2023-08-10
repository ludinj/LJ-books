import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LJ-books',
  description: 'Los libros de LJ'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body>
        <main className='m-auto max-w-screen-lg  min-h-screen grid grid-rows-[60px,1fr,60px] gap-4 px-4'>
          <nav className='flex items-center text-2xl'>LJ-books</nav>
          <section>{children}</section>
          <footer className='flex items-center text-2xl justify-center'>
            borrego300@yahoo.com
          </footer>
        </main>
      </body>
    </html>
  );
}
