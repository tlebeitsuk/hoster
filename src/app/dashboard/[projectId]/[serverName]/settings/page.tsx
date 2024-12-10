import ServerSettings from '@/components/server-settings'

type PageByIdProps = {
  params: {
    projectId: string
    serverName: string
  }
}

export default async function ServerSettingsPage({ params }: PageByIdProps) {
  const { projectId, serverName } = params 

  return <ServerSettings params={{serverName, projectId}} />
}


