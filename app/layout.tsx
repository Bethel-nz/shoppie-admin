import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/contexts/modal-provider';
import { ThemeProvider } from '@/contexts/theme-provider';

import './globals.css';
import { ToastProvider } from '@/contexts/toast-provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Shoppie - Admin Dashboard',
	description: 'Admin Dashboard for shoppie frontend store',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
						<main className='transition-colors duration-700'>
							<ToastProvider />
							<ModalProvider />
							{children}
						</main>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
