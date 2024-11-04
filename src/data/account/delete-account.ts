'use server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function deleteAccount() {
    try {
        const session = await auth.api.getSession({
            headers: headers(),
        })
        if (!session || !session.user) {
            throw new Error('Unauthorized')
        }

        const userId = session.user.id
        await prisma.user.delete({
            where: { id: userId },
        })

        return { success: true, message: 'Account deleted successfully' }
    } catch (error) {
        console.error('Error deleting account:', error)
        return { success: false, message: 'Failed to delete account' }
    }
}