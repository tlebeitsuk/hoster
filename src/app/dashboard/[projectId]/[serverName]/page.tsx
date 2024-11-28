import { getServers } from '@/data/projects/get-servers'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDistanceToNow } from 'date-fns'
import { unstable_noStore as noStore } from 'next/cache'
type PageByIdProps = {
  params: {
    projectId: string
    serverName: string
  }
}

export default async function InstancePage({ params }: PageByIdProps) {
  noStore()
  const { projectId, serverName } = params
  const servers = await getServers(projectId)

  const server = servers.find((s) => s.name === serverName)

  if (!server) {
    return <div>Server not found</div>
  }

  const statusClass =
    server.status === 'Running' ? 'text-green-500' : 'text-red-500'

  const createdAtResult = formatDistanceToNow(server.created_at, {
    addSuffix: true,
  })

  const usedAtResult = formatDistanceToNow(server.last_used_at, {
    addSuffix: true,
  })

  return (
    <>
      <div className="flex flex-wrap items-center flex-col pt-20 gap-5">
        <h1 className="font-medium text-xl">{serverName}</h1>
        <div className="mt-5 p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Status</TableHead>
                <TableHead className="w-[150px]">Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className={statusClass}>{server.status}</TableCell>
                <TableCell>{createdAtResult}</TableCell>
                <TableCell>{usedAtResult}</TableCell>
                <TableCell>{server.location}</TableCell>
                <TableCell>{server.type}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
