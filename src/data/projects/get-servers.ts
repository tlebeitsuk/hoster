import { callIncus } from "@/lib/incus"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function getServers(projectId?: string) {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized")
  }

  // Check if the user has access to the project
  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectId),
      userId: session.user.id,
    },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  const servers = await callIncus("/instances", {
    query: { project: projectId, recursion: 2 },
  })
  return servers
}
