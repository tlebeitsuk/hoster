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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

interface Server {
  id: string
  status: 'Running' | 'Stopped'
  created_at: Date
  last_used_at: Date
  name: string
}

interface Project {
  id: number
  title: string
  description: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  noStore()
  const projectId = (await params).projectId
  const servers = await getServers(projectId)
  const project = (await getProjects(Number(projectId))) as Project | null

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
            {servers.length > 0 ? (
              <Button size="sm" asChild>
                <Link href={`/dashboard/${projectId}/server/new`}>
                  New Service
                </Link>
              </Button>
            ) : null}
          </div>
        </div>

        {servers.length > 0 ? (
          <div className="p-6 mt-4 border-[1px] rounded-md border-[E2E8F0]">
            <Table>
              <TableHeader className="w-full">
                <TableRow className="w-full ">
                  <TableHead className="w-[25%]">Name</TableHead>
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

                  const createdAtResult = formatDistanceToNow(
                    server.created_at,
                    {
                      addSuffix: true,
                    }
                  )

                  const usedAtResult = formatDistanceToNow(
                    server.last_used_at,
                    {
                      addSuffix: true,
                    }
                  )

                  return (
                    <Link
                      href={`/dashboard/${projectId}/${server.name}`}
                      key={server.name}
                      legacyBehavior
                    >
                      <TableRow className="cursor-pointer">
                        <TableCell className="w-[25%]">{server.name}</TableCell>
                        <TableCell className={`w-[25%] ${statusClass}`}>
                          {server.status}
                        </TableCell>
                        <TableCell className="w-[25%]">
                          {createdAtResult}
                        </TableCell>
                        <TableCell className="w-[25%]">
                          {new Date(server.last_used_at).getTime()
                            ? usedAtResult
                            : ''}
                        </TableCell>
                      </TableRow>
                    </Link>
                  )
                })}
              </TableBody>
            </Table>
            <Separator />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Link href={`/dashboard/${projectId}/server/new`}>
              <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                <CardHeader>
                  <CardTitle>New Server</CardTitle>
                  <CardDescription>
                    Create a new blank server instance
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href={`/dashboard/${projectId}/server/new?template=mysql`}>
              <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                <CardHeader>
                  <CardTitle>MySQL</CardTitle>
                  <CardDescription>Deploy a MySQL database</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link
              href={`/dashboard/${projectId}/server/new?template=postgresql`}
            >
              <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                <CardHeader>
                  <CardTitle>PostgreSQL</CardTitle>
                  <CardDescription>
                    Deploy a PostgreSQL database
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link
              href={`/dashboard/${projectId}/server/new?template=wordpress`}
            >
              <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                <CardHeader>
                  <CardTitle>WordPress</CardTitle>
                  <CardDescription>Deploy a WordPress website</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
