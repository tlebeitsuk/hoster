"use server"
import { callIncus } from "@/lib/incus"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export const deleteServer = async (projectId: string, serverName: string) => {
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
    const response = await callIncus(`/instances/${serverName}`, {
      method: "DELETE",
      query: { project: projectId },
    })

    revalidatePath(`/dashboard/${projectId}`)

    return response
  } catch (error) {
    console.error("Failed to delete server:", error)
    throw new Error("Unable to delete server")
  }
}
