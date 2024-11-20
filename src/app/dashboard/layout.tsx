import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import Breadcrumbs from '@/components/breadcrumbs'
import { AppSidebar } from '@/components/sidebar-app'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Breadcrumbs />
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
