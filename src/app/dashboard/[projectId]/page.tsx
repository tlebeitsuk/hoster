import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

        <ul className=" bg-zinc-100 border-2 mt-5 border-zinc-200 rounded-sm p-3">
          {servers.map((server) => {

            const statusClass = server.status === "Running" ? "text-green-500" : "text-red-500";

            const createdAtResult = formatDistanceToNow(
              server.created_at
            )

            const usedAtResult = formatDistanceToNow(
              server.last_used_at
            )
            
            return (
              <>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{server.name}</AccordionTrigger>
                    <AccordionContent>
                      <ul key={server.name + 'overview'}>
                        <li key={server.status} className={statusClass}><b>{server.status}</b></li>
                        <li key={server.last_used_at}><b>Last used at:</b> {usedAtResult} ago</li>
                        <li key={server.created_at}><b>Created at:</b> {createdAtResult} ago</li>
                        <li key={server.description}><b>Description:</b> {server.description}</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}