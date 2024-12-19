import User from '@/components/sidebar-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'
import Projects from '@/components/sidebar-projects'
import { getProjects } from '@/data/projects/get-projects'
import Link from 'next/link'
import Image from 'next/image'

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const projects = await getProjects()
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <Link
          href="/dashboard"
          className="flex items-center px-4 py-6 h-16 border-b border-border bg-background"
        >
          <Image
            src="/logo.svg"
            alt="Hostess"
            height={144}
            width={144}
            className="w-36"
          />
        </Link>
        <Projects projects={projects as Project[]} />
      </SidebarContent>
      <SidebarFooter>
        <User />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
