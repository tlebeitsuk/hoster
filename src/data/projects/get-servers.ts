import { callIncus } from "@/lib/incus";

export async function getServers(projectId?: string) {
  console.log(projectId);
  const servers = await callIncus("/instances", {
    query: { project: projectId, recursion: 1 },
  });

  return servers;
}

export async function getProjects(projectId?: string) {
  console.log(projectId);
  const servers = await callIncus("/instances", {
    query: { project: projectId, recursion: 1 },
  });

  return servers;
}