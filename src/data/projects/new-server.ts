"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { callIncus } from "@/lib/incus"
import prisma from "@/lib/prisma"

type ServerConfig = {
  name: string
  source: {
    type: string
    protocol: string
    server: string
    alias: string
  }
}

export async function newServer(projectId: string, config: ServerConfig) {
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
        id: Number(projectId),
        userId: session.user.id,
      },
    })

    if (!project) {
      throw new Error("Project not found")
    }

    const response = await callIncus("/instances", {
      method: "POST",
      query: { project: projectId },
      body: config,
    })

    return response
  } catch (error) {
    console.error("Error creating server:", error)
    throw new Error("Failed to create server")
  }
}
