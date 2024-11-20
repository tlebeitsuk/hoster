'use client'
import { MoreHorizontal, Plus, type LucideIcon } from 'lucide-react'
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
		title: string
		id: number
	}[]
}) {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map(item => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild>
							<Link href={'/dashboard/' + item.title}>
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
          <SidebarMenuButton asChild>
						<Link href="/dashboard/projects/new">
							<Plus />
							<span>Create new project</span>
						</Link>
          </SidebarMenuButton>
			</SidebarMenu>
		</SidebarGroup>
	)
}
