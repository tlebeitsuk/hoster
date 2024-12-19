import { getServers } from '@/data/projects/get-servers'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatDistanceToNow } from 'date-fns'
import { Separator } from '@/components/ui/separator'
import { unstable_noStore as noStore } from 'next/cache'
import ToggleServerStatus from '@/components/toggle-server-status'
import { ServerCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function InstancePage({ params }: PageById) {
  noStore()
  const { projectId, serverName } = params
  const servers = await getServers(projectId)
  const server = servers.find((s: Server) => s.name === serverName)

  const statusClass =
    server?.status === 'Running' ? 'text-green-500' : 'text-red-500'

  const memory = server?.state?.memory
  const totalMemory = Math.round((memory?.total / 1000000000) * 10) / 10
  const usedMemory = Math.round((memory?.usage / 1000000000) * 10) / 10

  const memoryPercentage = usedMemory / (totalMemory / 100)
  let MPercent = parseFloat(memoryPercentage.toFixed(1))
  if (Number.isNaN(MPercent)) {
    MPercent = 0
  }

  const cpu = Math.round((server?.state?.cpu.usage / 1000000000) * 10) / 10

  const ip = server?.state?.network?.eth0?.addresses[0]?.address

  if (!server) {
    return <div className="p-4">Server not found</div>
  }

  const createdAtResult = formatDistanceToNow(server.created_at, {
    addSuffix: true,
  })

  const usedAtResult = formatDistanceToNow(server.last_used_at, {
    addSuffix: true,
  })

  return (
    <>
      <div className="flex flex-wrap m-5 flex-col gap-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ServerCog className={statusClass} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Server is {server.status}.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h1 className="font-medium text-xl">{serverName}</h1>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/dashboard/${projectId}/${serverName}/settings`}>
              Settings
            </Link>
          </Button>
        </div>

        <Separator />

        <div className="p-3 flex gap-5">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>
                Memory <span className="text-green-500">[RAM]</span>
              </CardTitle>
              <div className="flex justify-end">
                <CardDescription>{MPercent}/100%</CardDescription>
              </div>
              <Progress value={MPercent} />
            </CardHeader>
            <CardContent>
              <p>Total capacity: {totalMemory} GB</p>
              <p>Current usage: {usedMemory} GB</p>
            </CardContent>
          </Card>

          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>
                <span className="text-blue-500">[CPU]</span> Usage
              </CardTitle>
              <div className="flex justify-end">
                <CardDescription>{cpu}/100%</CardDescription>
              </div>
              <Progress value={cpu} />
            </CardHeader>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">IP</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className={statusClass}>
                <ToggleServerStatus
                  server={{
                    name: server.name,
                    status: server.status,
                    projectId,
                  }}
                  statusClass={statusClass}
                />
              </TableCell>
              <TableCell>{ip}</TableCell>
              <TableCell>{createdAtResult}</TableCell>
              <TableCell>
                {new Date(server.last_used_at).getTime() ? usedAtResult : ''}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}
