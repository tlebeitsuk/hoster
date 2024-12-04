import ServerSettings from '@/components/server-settings'
import { getServers } from '@/data/projects/get-servers'

export default async function ServerSettingsPage({ params }: { params: { projectId: string; serverId: string } }) {
 
  const servers = await getServers()
  const serverID = params.serverId 
  return <ServerSettings params={{servers, serverID}} />
}


