import NewServer from '@/components/new-server'

export default async function ServerPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const projectId = (await params).projectId
  return <NewServer projectId={projectId} />
}
