import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { getServers } from '@/data/projects/get-servers'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { unstable_noStore as noStore } from 'next/cache'

interface Server {
  id: string
  status: 'Running' | 'Stopped'
  created_at: Date
  last_used_at: Date
  name: string
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  noStore()
  const projectId = (await params).projectId
  const servers = await getServers(projectId)

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p>Project</p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={`/dashboard/${projectId}/settings`}>Settings</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/dashboard/${projectId}/server/new`}>
                New Server
              </Link>
            </Button>
          </div>
        </div>
        <div className="p-6 mt-4 border-[1px] rounded-md border-[E2E8F0]">
          <Table>
            <TableHeader className="w-full">
              <TableRow className="w-full ">
                <TableHead className="w-[25%]">Server name</TableHead>
                <TableHead className="w-[25%]">Status</TableHead>
                <TableHead className="w-[25%]">Created</TableHead>
                <TableHead className="w-[25%]">Last used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {servers.map((server: Server) => {
                const statusClass =
                  server.status === 'Running'
                    ? 'text-green-500'
                    : 'text-red-500'

                const createdAtResult = formatDistanceToNow(server.created_at, {
                  addSuffix: true,
                })

                const usedAtResult = formatDistanceToNow(server.last_used_at, {
                  addSuffix: true,
                })

                const serverName = server.name
                return (
                  <TableRow key={`${serverName}`}>
                    <TableCell>
                      <Link
                        href={'/dashboard/' + projectId + '/' + serverName}
                        className="font-medium hover:underline w-[25%]"
                      >
                        {serverName}
                      </Link>
                    </TableCell>
                    <TableCell className={`w-[25%] ${statusClass}`}>
                      {server.status}
                    </TableCell>
                    <TableCell className="w-[25%]">{createdAtResult}</TableCell>
                    <TableCell className="w-[25%]">
                        {new Date(server.last_used_at).getTime()
                          ? usedAtResult
                          : ''}
                      </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Separator />
        </div>
      </div>
    </>
  )
}
