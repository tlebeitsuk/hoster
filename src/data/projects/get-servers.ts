import { callIncus } from "@/lib/incus"

export async function getServers(projectId?: string) {
  const servers = await callIncus("/instances")

  return servers
}
