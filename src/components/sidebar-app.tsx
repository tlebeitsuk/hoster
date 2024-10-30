'use client'
import {
	AudioWaveform,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
} from 'lucide-react'
import Main from '@/components/sidebar-main'
import User from '@/components/sidebar-user'
import Switcher from '@/components/sidebar-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'

const data = {
	servers: [
		{
			name: 'Enterprise',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Startup',
			logo: AudioWaveform,
			plan: 'Startup',
		},
		{
			name: 'Free',
			logo: Command,
			plan: 'Free',
		},
	],
	main: [
		{
			title: 'Server',
			url: '#',
			icon: SquareTerminal,
			isActive: false,
			items: [
				{
					title: 'Overview',
					url: '#',
				},
				{
					title: 'Metrics',
					url: '#',
				},
				{
					title: 'Logs',
					url: '#',
				},
				{
					title: 'Backups',
					url: '#',
				},
				{
					title: 'Service',
					url: '#',
				},
			],
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'General',
					url: '#',
				},
				{
					title: 'Team',
					url: '#',
				},
				{
					title: 'Billing',
					url: '#',
				},
				{
					title: 'Limits',
					url: '#',
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<Switcher servers={data.servers} />
			</SidebarHeader>
			<SidebarContent>
				<Main items={data.main} />
			</SidebarContent>
			<SidebarFooter>
				<User />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
