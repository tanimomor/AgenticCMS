import { Inter, Space_Grotesk, Crimson_Pro } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap',
});

export const metadata = {
  title: 'Artisan CMS - Redefining Content Management',
  description: 'A revolutionary CMS experience crafted with artistic precision and futuristic intelligence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${crimsonPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}