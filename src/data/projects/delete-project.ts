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
