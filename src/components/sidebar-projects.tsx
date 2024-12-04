'use client'
import { Plus } from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Projects({
  projects,
}: {
  projects: {
    title: string
    id: number
  }[]
}) {
  const params = useParams<{ projectId: string }>()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden pt-0">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link
                className={
                  item.id === Number(params.projectId)
                    ? 'bg-primary text-white'
                    : ''
                }
                href={'/dashboard/' + item.id}
              >
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
