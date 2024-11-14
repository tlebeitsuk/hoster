import Login from '@/components/login'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
	const session = await auth.api.getSession({
		headers: headers(),
	})

	if (session) {
		redirect('/dashboard')
	}

	return <Login />
}
