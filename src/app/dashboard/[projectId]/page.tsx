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
import { getProjects } from '@/data/projects/get-projects'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  noStore()
  const projectId = (await params).projectId
  const servers = await getServers(projectId)
  const project = await getProjects(Number(projectId))

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl">{project?.title}</h1>
            <p className="dark:text-gray-400 text-gray-600">
              {project?.description}
            </p>
          </div>
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
        <div className="p-6 pt-0  mt-4 border-[1px] rounded-md border-[E2E8F0]">
          <Table>
            <TableHeader className="w-full">
              <TableRow className="w-full ">
                <TableHead className="w-[25%]">Server name</TableHead>
                <TableHead className="w-[25%]">Status</TableHead>
                <TableHead className="w-[25%]">Created</TableHead>
                <TableHead className="w-[25%]">Last used</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <Separator />

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
                <Table>
                  <TableBody className="w-full">
                    <TableRow>
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
                      <TableCell className="w-[25%]">
                        {createdAtResult}
                      </TableCell>
                      <TableCell className="w-[25%]">{usedAtResult}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
