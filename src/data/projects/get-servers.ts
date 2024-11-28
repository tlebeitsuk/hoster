import { callIncus } from "@/lib/incus";

export async function getServers(projectId?: string) {
  const servers = await callIncus("/instances", {
    query: { project: projectId, recursion: 2 },
  });
  return servers;
}