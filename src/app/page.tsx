import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center h-16 py-4 px-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0 w-full border-b">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Hostess"
            height={144}
            width={144}
            className="w-36"
          />
        </Link>
        <div>
          <Button asChild variant="link" className="px-0">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto text-center">
        <div>
          <span className="text-3xl md:text-4xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-[#7604dd] to-[#6888df] text-transparent bg-clip-text">
            Powerful Servers, Effortless Hosting
          </span>
        </div>
        <p className="mt-2 mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
          Launch your projects with lightning-fast servers and seamless hosting
          solutions. Scale your ideas with Hostess.
        </p>
        <Button
          asChild
          size="lg"
          className="text-white mt-4 group rounded-lg bg-gradient-to-r from-[#7604dd] to-[#6888df] bg-[length:150%_auto] hover:bg-right transition-all duration-300 ease-in-out"
        >
          <Link href="/login">
            Get Started
            <ArrowRight
              className="size-16 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </main>

      <footer className="flex items-center justify-between py-4 px-8 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Hostess</p>
        <ThemeToggle />
      </footer>
    </div>
  )
}
