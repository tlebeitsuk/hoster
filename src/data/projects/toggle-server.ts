"use server"
import { callIncus } from "@/lib/incus"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"

export const toggleServer = async (
  projectId: string,
  serverName: string,
  action: "start" | "stop",
) => {
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

  try {
    const response = await callIncus(`/instances/${serverName}/state`, {
      method: "PUT",
      query: { project: projectId },
      body: { action: action },
    })

    revalidatePath(`/dashboard/${projectId}/${serverName}`)
    revalidatePath(`/dashboard/${projectId}`)
    return response
  } catch (error) {
    console.error("Failed to toggle server:", error)
    throw new Error("Unable to change server state")
  }
}

export const revalidatePage = async (path: string) => {
  revalidatePath(path)
}
