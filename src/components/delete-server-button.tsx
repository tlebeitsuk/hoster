'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { deleteServer } from '@/data/projects/delete-server'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

type DeleteServerProps = {
  server: {
    name: string
    projectId: string
    status: string
  }
}

export default function DeleteServerButton({ server }: DeleteServerProps) {
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
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete Server</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            server and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
