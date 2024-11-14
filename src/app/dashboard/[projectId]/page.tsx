import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { getServers } from "@/data/projects/get-servers";
import { formatDistanceToNow } from "date-fns";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  const servers = await getServers(projectId);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-4 pt-0">
        <p>Project</p>

        <ul>
          {servers.map((server) => {

            const statusClass = server.status === "Running" ? "text-green-500" : "text-red-500";

            const createdAtResult = formatDistanceToNow(
              server.created_at
            ,{ addSuffix: true });

            const usedAtResult = formatDistanceToNow(
              server.last_used_at
            ,{ addSuffix: true });

            const serverName = server.name;
            
            return (
              <>
                <div className=" bg-zinc-100 border-2 mt-5 border-zinc-200 rounded-md p-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Server name</TableHead>
                        <TableHead className="w-[200px]">Status</TableHead>
                        <TableHead className="w-[100px]">Created</TableHead>
                        <TableHead>Last used</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Link href={'/dashboard/' + projectId + '/' + serverName} className="font-medium hover:underline">{serverName}</Link>
                        </TableCell>
                        <TableCell className={statusClass}>{server.status}</TableCell>
                        <TableCell>{createdAtResult}</TableCell>
                        <TableCell>{usedAtResult}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}