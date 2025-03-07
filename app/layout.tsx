import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Lighthouse Bible Platform',
  description: 'A modern platform for Bible study and exploration.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
