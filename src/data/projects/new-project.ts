"use server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { callIncus } from "@/lib/incus"

export async function newProject(title: string, description: string) {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    })

    if (!session || !session.user || !session.user.id) {
      throw new Error("User not authorized")
    }

    // 1. New project in the database
    const userId = session.user.id
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        userId,
      },
    })

    // 2. New project in Incus
    await callIncus("/projects", {
      method: "POST",
      body: {
        config: {
          "features.images": "false",
        },
        name: newProject.id.toString(),
        description: newProject.title,
      },
    })

    // 3. Configure the default profile for the new project (add nic and disk)
    await callIncus(`/profiles/default`, {
      method: "PATCH",
      query: { project: newProject.id },
      body: {
        devices: {
          eth0: {
            name: "eth0",
            network: "incusbr0",
            type: "nic",
          },
          root: {
            path: "/",
            pool: "default",
            type: "disk",
          },
        },
      },
    })

    return newProject
  } catch (error) {
    console.error("Error during project creation:", error)
    throw new Error("Failed to create a project")
  }
}
