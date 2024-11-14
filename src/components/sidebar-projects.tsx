'use client'
import { MoreHorizontal, type LucideIcon } from 'lucide-react'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'

export default function Projects({
	projects,
}: {
	projects: {
		name: string
		url: string
		icon: LucideIcon
	}[]
}) {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map(item => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<Link href={'/dashboard' + item.url}>
								<item.icon />
								<span>{item.name}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
				<SidebarMenuItem>
					<SidebarMenuButton className="text-sidebar-foreground/70">
						<MoreHorizontal className="text-sidebar-foreground/70" />
						<span>More</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	)
}
