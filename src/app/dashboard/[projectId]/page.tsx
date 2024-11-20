import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getServers } from "@/data/projects/get-servers";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  const servers = await getServers(projectId);

  return (
    <>
      <div className="p-4">
        <p>Project</p>
        <div className="p-6 pt-0  mt-4 border-[1px] rounded-md border-[E2E8F0]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Server name</TableHead>
              <TableHead className="w-[250px]">Status</TableHead>
              <TableHead className="w-[250px]">Created</TableHead>
              <TableHead>Last used</TableHead>
            </TableRow>
          </TableHeader>
          <Separator />
          <ul>
            {servers.map((server) => {
              const statusClass =
                server.status === "Running" ? "text-green-500" : "text-red-500";

              const createdAtResult = formatDistanceToNow(server.created_at, {
                addSuffix: true,
              });

              const usedAtResult = formatDistanceToNow(server.last_used_at, {
                addSuffix: true,
              });

              const serverName = server.name;

              return (
                <>
                  <div className="mt-5 rounded-md p-3">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Link
                              href={
                                "/dashboard/" + projectId + "/" + serverName
                              }
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
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
