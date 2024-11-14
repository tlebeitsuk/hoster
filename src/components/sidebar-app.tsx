import User from '@/components/sidebar-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from '@/components/ui/sidebar'
import Projects from '@/components/sidebar-projects'
import { getProjects} from '@/data/projects/get-projects'

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const projects = await getProjects();
	return (
		<Sidebar {...props}>
			<SidebarContent>
				<Projects projects={projects} />
			</SidebarContent>
			<SidebarFooter>
				<User />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

