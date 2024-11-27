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
                <Table>
                  <TableBody className="w-full">
                    <TableRow>
                      <TableCell>
                        <Link
                          href={"/dashboard/" + projectId + "/" + serverName}
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
            );
          })}
        </div>
      </div>
    </>
  );
}
