import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { QuickViewModal } from '@/components/layout/QuickViewModal';
import { ToastContainer } from '@/components/layout/ToastContainer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AETHER APPAREL | Architectural Minimalist Luxury Clothing',
  description: 'Experience bespoke 500 GSM French Terry hoodies, Australian Merino wool knits, and European linen shirts. Free express delivery across India with 7-day doorstep returns.',
  keywords: 'clothing, luxury streetwear, french terry hoodie, linen shirt, selvedge denim, modern menswear, minimalist fashion',
  openGraph: {
    title: 'AETHER APPAREL | Architectural Minimalist Luxury Clothing',
    description: 'Bespoke 500 GSM heavyweight hoodies, Italian linen shirts, and Australian Merino wool.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans antialiased selection:bg-zinc-950 selection:text-white">
        <AppProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
