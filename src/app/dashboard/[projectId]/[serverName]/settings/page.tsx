import ServerSettings from '@/components/server-settings'

export default async function ServerSettingsPage({ params }: PageById) {
  const { projectId, serverName } = params

  return <ServerSettings params={{ serverName, projectId }} />
}
