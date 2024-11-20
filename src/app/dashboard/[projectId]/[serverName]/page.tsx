import { getServers } from "@/data/projects/get-servers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

  if (!server) {
    return <div>Server not found</div>;
  }

  // const RAM = server.metadata
  console.log(server);
  

  // const createdAtResult = formatDistanceToNow(
  //   server.created_at
  // ,{ addSuffix: true });

  // const usedAtResult = formatDistanceToNow(
  //   server.last_used_at
  // ,{ addSuffix: true });

  return (
    <>
      <Breadcrumb className="m-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={"/dashboard/" + projectId}>Project {projectId}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{serverName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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

        <div className="mt-5 p-3 flex gap-5">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Memory Usage <span className="text-green-500">[RAM]</span></CardTitle>
              <CardDescription>31%/100%</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total capacity: 16 GB</p>
              <p>Used capacity: 16 GB</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              
            </CardFooter>
          </Card>

          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle> <span className="text-blue-500">[Disk]</span> Storage</CardTitle>
              <CardDescription>31%/100%</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total capacity: 16 GB</p>
              <p>Used capacity: 16 GB</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              
            </CardFooter>
          </Card>

          {/* <Table>
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
          </Table> */}
        </div>

      </div>
    </>
  );
}
