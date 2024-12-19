'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { deleteServer } from '@/data/projects/delete-server'
import { AlertDialogAction } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

export default function DeleteServerButton({ server }: DeleteServer) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const serverStatusIsRunning = () => {
    return server.status === 'Running'
  }

  const handleDeleteServer = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      await deleteServer(server.projectId, server.name)
      toast.success('Successfully deleted server.')
      router.push(`/dashboard/${server.projectId}`)
    } catch (error) {
      console.error('Failed to delete server:', error)
      toast.error('An error occurred while deleting the server.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      onClick={handleDeleteServer}
      className={`${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={serverStatusIsRunning() || isDeleting}
      variant="destructive"
      title={isDeleting ? 'Deleting...' : 'Click to delete server'}
      asChild
    >
      <AlertDialogAction>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </AlertDialogAction>
    </Button>
  )
}
