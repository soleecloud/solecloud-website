import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Sole Cloud - Powering Your Digital Presence in the Cloud',
  description: 'Website creation and AWS hosting tailored for your business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts are loaded in pages/_document.tsx */}
      </head>
      <body className="bg-white text-gray-900 min-h-screen custom-scrollbar">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}