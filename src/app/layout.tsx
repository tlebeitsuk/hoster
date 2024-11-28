import type { Metadata } from 'next'
import localFont from 'next/font/local'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/hooks/theme-provider'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Hostess',
	description: 'Launch your projects with lightning-fast servers and seamless hosting solutions.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system">
					<NextTopLoader showSpinner={false} />
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
