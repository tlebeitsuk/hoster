import { callIncus } from "@/lib/incus";

export async function getServers(projectId?: string) {
  const servers = await callIncus("/instances?recursion=2", {
    query: { project: projectId, recursion: 2 },
  });

  return servers;
}

export async function getProjects(projectId?: string) {
  const servers = await callIncus("/instances", {
    query: { project: projectId, recursion: 1 },
  });

  return servers;
}