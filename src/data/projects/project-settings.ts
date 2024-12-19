"use server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function renameProject(projectID: number, newName: string) {
  if (!newName || typeof newName !== "string" || newName.trim() === "") {
    throw new Error("Valid project name is required.")
  }

  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized")
  }

  // Check if the user has access to the project
  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectID),
      userId: session.user.id,
    },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  return await prisma.project.update({
    where: { id: projectID },
    data: { title: newName },
  })
}

export async function changeProjectDescription(
  projectID: number,
  newDescription: string,
) {
  if (
    !newDescription ||
    typeof newDescription !== "string" ||
    newDescription.trim() === ""
  ) {
    throw new Error("Valid project description is required.")
  }

  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized")
  }

  // Check if the user has access to the project
  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectID),
      userId: session.user.id,
    },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  return await prisma.project.update({
    where: { id: projectID },
    data: { description: newDescription },
  })
}
