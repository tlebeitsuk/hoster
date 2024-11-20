'use server'
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers'

export async function newProject(title: string, description: string) {
    try {
        const session = await auth.api.getSession({
            headers: headers(),
        });

        if (!session || !session.user || !session.user.id) {
            throw new Error("User not authorized");
        }

        const userId = session.user.id;
        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                userId,
            },
        });

        return newProject;
    } catch (error) {
        console.error("Error during project creation:", error);
        throw new Error("Failed to create a project");
    }
}
