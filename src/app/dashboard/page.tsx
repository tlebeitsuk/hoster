import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: headers(),
	})

	return (
		<div className="p-4">
			<p>Welcome, {session?.user?.name}</p>
		</div>
	)
}
