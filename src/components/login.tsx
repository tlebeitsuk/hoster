'use client'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth-client'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
  const handleLogin = async () => {
    await auth.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    })
  }
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
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="p-8 bg-white dark:bg-gray-800 sm:rounded-lg shadow-xl w-full max-w-md sm:mx-4">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Welcome,
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              or welcome back!
            </p>
          </div>

          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full text-white bg-gradient-to-r from-[#7604dd] to-[#6888df] bg-[length:200%_auto] hover:bg-right transition-all duration-300 ease-in-out"
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="size-5 invert"
            />
            <span className="text-lg font-medium">Continue with GitHub</span>
          </Button>
        </div>
      </main>

      <footer className="flex items-center justify-between py-4 px-8 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Hostess</p>
        <ThemeToggle />
      </footer>
    </div>
  )
}
