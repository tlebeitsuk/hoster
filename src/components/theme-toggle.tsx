'use client'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<SunIcon />
					Light
					{theme === 'light' && <Check />}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<MoonIcon />
					Dark
					{theme === 'dark' && <Check />}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<LaptopIcon />
					System
					{theme === 'system' && <Check />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
