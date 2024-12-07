import ProjectSettings from '@/components/project-settings'
import { getProjects } from '@/data/projects/get-projects'

export default async function SettingsPage(query: { params: { projectId: string } }) {
  const projects = await getProjects();
  const projectID = query.params.projectId  

  return <ProjectSettings params={{projects, projectID}} />
}
