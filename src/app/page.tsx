import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<header className="flex justify-between items-center py-4 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0 w-full border-b">
				<nav className="flex gap-6 items-center">
					<span className="ml-2 text-lg font-bold">Hoster</span>
				</nav>
				<div>
					<Button asChild variant="link">
						<Link href="/login">Login</Link>
					</Button>
				</div>
			</header>

			<div className="flex flex-col items-center justify-center min-h-dvh max-w-7xl mx-auto">
				<section className="w-full flex justify-center px-6 py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div>
							<h1 className="text-3xl md:text-4xl lg:text-7xl font-bold tracking-tighter text-orange-600">
								Powerful Servers, Effortless Hosting
							</h1>
							<p className="mt-2 mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
								Launch your projects with lightning-fast servers and seamless hosting
								solutions. Scale your ideas with Hoster.
							</p>
						</div>
						<Button asChild size="lg">
							<Link href="/login">Get Started</Link>
						</Button>
					</div>
				</section>
			</div>
			<footer className="flex justify-center py-6 px-4 border-t">
				<p className="text-xs text-muted-foreground">
					&copy; 2024 Hoster. All rights reserved.
				</p>
			</footer>
		</>
	)
}
