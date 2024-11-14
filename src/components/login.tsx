'use client'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth-client'
import { Github } from "lucide-react";

export default function Login() {
	const handleLogin = async () => {
		await auth.signIn.social({
			provider: 'github',
			callbackURL: '/dashboard',
		})
	}
	return (
		<div className="flex items-center justify-center flex-col gap-6 min-h-screen w-full">
			<div className="flex gap-4 items-center w-60">
				<div className="bg-black w-0.5 h-10 rounded-lg shadow-lg"></div>
				<div>
					<h1 className="text-3xl">Welcome,</h1>
					<p className="tracking-wide">or welcome back!</p>
				</div>
			</div>

			<Button
				onClick={handleLogin}
				variant="outline"
				className=" border-2 border-gray-700 px-16 py-4 flex gap-2 shadow-xl"
			>
				<Github className="mr-1 size-4" />
				<p className="text-[16px]">Login with Github</p>
			</Button>
		</div>
	)
}
