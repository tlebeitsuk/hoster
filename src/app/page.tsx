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
				<section className="w-full">
					<div className="w-full px-4 py-4 sm:py-16">
						<h2 className="text-3xl font-bold md:text-4xl text-center mb-6 sm:mb-8">
							Pricing
						</h2>
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							<Card>
								<CardHeader>
									<CardTitle>Starter</CardTitle>
									<CardDescription>Perfect for small projects</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-3xl font-bold">
										0.99€ <span className="text-muted-foreground text-sm">per month</span>
									</p>
									<ul className="mt-4 space-y-2">
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />1 CPU Core
										</li>
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />1 GB RAM
										</li>
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />2 GB Storage
										</li>
									</ul>
								</CardContent>
								<CardFooter>
									<Button className="w-full" asChild>
										<Link href="/login">Get Started</Link>
									</Button>
								</CardFooter>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Pro</CardTitle>
									<CardDescription>Ideal for growing businesses</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-3xl font-bold">
										1.99€ <span className="text-muted-foreground text-sm">per month</span>
									</p>
									<ul className="mt-4 space-y-2">
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />2 CPU Cores
										</li>
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />4 GB RAM
										</li>
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />
											10 GB Storage
										</li>
									</ul>
								</CardContent>
								<CardFooter>
									<Button className="w-full" asChild>
										<Link href="/login">Get Started</Link>
									</Button>
								</CardFooter>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Enterprise</CardTitle>
									<CardDescription>For large-scale applications</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-3xl font-bold">
										2.99€ <span className="text-muted-foreground text-sm">per month</span>
									</p>
									<ul className="mt-4 space-y-2">
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />4 CPU Cores
										</li>
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />8 GB RAM
										</li>
										<li className="flex items-center">
											<Check className="mr-2 size-4 text-green-500" />
											50 GB Storage
										</li>
									</ul>
								</CardContent>
								<CardFooter>
									<Button className="w-full" asChild>
										<Link href="/login">Get Started</Link>
									</Button>
								</CardFooter>
							</Card>
						</div>
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
