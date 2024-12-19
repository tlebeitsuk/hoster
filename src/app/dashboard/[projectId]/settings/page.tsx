import ProjectSettings from '@/components/project-settings'
import { getProjects } from '@/data/projects/get-projects'
import { getServers } from '@/data/projects/get-servers'

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const projectID = (await params).projectId
  const projects = await getProjects(Number(projectID))
  const servers = await getServers(projectID.toString())

  return (
    <ProjectSettings
      projects={projects as Project}
      projectID={projectID}
      servers={servers as Server[]}
    />
  )
}
