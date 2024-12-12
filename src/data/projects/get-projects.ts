'use server'
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const getProjects = async (projectId?: number) => {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session || !session.user || !session.user.id) {
      throw new Error("User not authorized");
    }

    const userId = session.user.id;
    const projects = projectId
      ? await prisma.project.findUnique({
        where: {
          id: projectId,
          userId: userId
        },
      })
      : await prisma.project.findMany({
        where: {
          userId: userId
        },
        orderBy: {
          createdAt: 'asc'
        }
      });

    return projects;
  } catch (error) {
    console.error('Error fetching projects for user:', error);
    throw error;
  }
};
