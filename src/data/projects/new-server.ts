"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { callIncus } from "@/lib/incus"

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

    const response = await callIncus("/instances", {
      method: "POST",
      query: { project: projectId },
      body: config,
    })
    console.log(response)
    return response
  } catch (error) {
    console.error("Error creating server:", error)
    throw new Error("Failed to create server")
  }
}
