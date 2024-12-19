"use server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { callIncus } from "@/lib/incus"

export async function deleteProject(id: number) {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    })

    if (!session || !session.user || !session.user.id) {
      throw new Error("User not authorized")
    }

    // Check if the user has access to the project
    const project = await prisma.project.findUnique({
      where: {
        id: Number(id),
        userId: session.user.id,
      },
    })

    if (!project) {
      throw new Error("Project not found")
    }

    // 1. Delete project from Incus
    await callIncus("/projects/" + id, {
      method: "DELETE",
      query: { force: true },
    })

    // 2. Delete project from database
    const deletedProject = await prisma.project.delete({
      where: {
        id: id,
      },
    })

    return deletedProject
  } catch (error) {
    console.error("Error during project creation:", error)
    throw new Error("Failed to create a project")
  }
}
