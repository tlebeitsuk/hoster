import { getServers } from "@/data/projects/get-servers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import ServerStatusIcon from "@/components/server-status"

type PageByIdProps = {
  params: {
    projectId: string;
    serverName: string;
  };
};

export default async function InstancePage({ params }: PageByIdProps) {
  const { projectId, serverName } = params;
  const servers = await getServers(projectId);
  const server = servers.find((s) => s.name === serverName);

  const statusClass = server.status === "Running" ? "text-green-500" : "text-red-500";

  const memory = server.state.memory
  const totalMemory = Math.round((memory.total / 1000000000) * 10) / 10
  const usedMemory = Math.round((memory.usage / 1000000000) * 10) / 10
  const cpu = Math.round((server.state.cpu.usage / 1000000000) * 10) / 10

  const memoryPercentage = usedMemory / (totalMemory / 100)
  const MPercent = parseFloat(memoryPercentage.toFixed(1))

  if (!server) {
    return <div>Server not found</div>;
  }

  const createdAtResult = formatDistanceToNow(
    server.created_at
  ,{ addSuffix: true });

  const usedAtResult = formatDistanceToNow(
    server.last_used_at
  ,{ addSuffix: true });

  return (
    <>
      <div className="flex flex-wrap m-5 flex-col gap-5">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ServerStatusIcon params={statusClass} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Server is {server.status}.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h1 className="font-medium text-xl">{serverName}</h1>
        </div>
        
        <Separator />

        <div className="p-3 flex gap-5">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Memory <span className="text-green-500">[RAM]</span></CardTitle>
              <div className="flex justify-end">
                <CardDescription>{MPercent}%/100%</CardDescription>
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
              <CardTitle> <span className="text-blue-500">[CPU]</span> Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Used capacity: <b className="text-blue-600">{cpu}</b> GB</p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Created</TableHead>
              <TableHead>Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{createdAtResult}</TableCell>
              <TableCell>{usedAtResult}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

