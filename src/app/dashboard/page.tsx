import Dashboard from '@/components/dashboard'
import { getProjects } from '@/data/projects/get-projects'

export default async function DashboardPage() {
  const projects = await getProjects()

  return <Dashboard projects={projects as Project[]} />
}
