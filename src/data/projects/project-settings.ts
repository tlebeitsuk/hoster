'use server'
import prisma from '@/lib/prisma';

export async function renameProject(projectID: number, newName: string) {
    if (!newName || typeof newName !== 'string' || newName.trim() === '') {
      throw new Error('Valid project name is required.');
    }
  
    return await prisma.project.update({
      where: { id: projectID },
      data: { title: newName },
    });
  }