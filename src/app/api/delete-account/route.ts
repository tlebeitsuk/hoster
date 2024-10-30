import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers })
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = session.user.id
        await prisma.user.delete({
            where: { id: userId },
        })

        return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Error deleting account:', error)
        return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
    }
}