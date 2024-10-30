'use client'
import { Frame, Map, PieChart } from 'lucide-react'
import User from '@/components/sidebar-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from '@/components/ui/sidebar'
import Projects from '@/components/sidebar-projects'

const data = {
	projects: [
		{
			name: 'Project 1',
			url: '/1',
			icon: Frame,
		},
		{
			name: 'Project 2',
			url: '/2',
			icon: PieChart,
		},
		{
			name: 'Project 3',
			url: '/3',
			icon: Map,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarContent>
				<Projects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<User />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
