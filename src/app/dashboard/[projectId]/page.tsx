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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const projectId = (await params).projectId
  const servers = await getServers(projectId)

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p>Project</p>
          <Button size="sm" asChild>
            <Link href={`/dashboard/${projectId}/settings`}>Settings</Link>
          </Button>
        </div>

        <ul>
          {servers.map((server) => {
            const statusClass =
              server.status === 'Running' ? 'text-green-500' : 'text-red-500'

            const createdAtResult = formatDistanceToNow(server.created_at, {
              addSuffix: true,
            })

            const usedAtResult = formatDistanceToNow(server.last_used_at, {
              addSuffix: true,
            })

            const serverName = server.name

            return (
              <>
                <div className=" bg-zinc-100 border-2 mt-5 border-zinc-200 rounded-md p-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Server name</TableHead>
                        <TableHead className="w-[200px]">Status</TableHead>
                        <TableHead className="w-[150px]">Created</TableHead>
                        <TableHead>Last used</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Link
                            href={'/dashboard/' + projectId + '/' + serverName}
                            className="font-medium hover:underline"
                          >
                            {serverName}
                          </Link>
                        </TableCell>
                        <TableCell className={statusClass}>
                          {server.status}
                        </TableCell>
                        <TableCell>{createdAtResult}</TableCell>
                        <TableCell>{usedAtResult}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </>
            )
          })}
        </ul>
      </div>
    </>
  )
}
