'use client'
import { useState } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import {
  changeProjectDescription,
  renameProject,
} from '@/data/projects/project-settings'
import { Textarea } from './ui/textarea'
import { deleteProject } from '@/data/projects/delete-project'
import { toast } from 'sonner'

export default function ProjectSettings({ params }) {
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const projects = params.projects
  const projectID = params.projectID
  const thisProject = projects.find((p) => p.id === Number(projectID))

  const handleDelete = async () => {
    if (!thisProject) return

    setIsDeleting(true)
    try {
      await deleteProject(thisProject.id)
      toast.success('Successfully deleted project.')
      router.push(`/dashboard`)
      router.refresh()
    } catch (error) {
      console.error('Failed to delete server:', error)
      toast.error('An error occurred while deleting the project.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClick = async () => {
    if (!newName.trim() && !newDescription.trim()) {
      toast.error('There are no changes to be saved.')
      return
    }

    setIsSaving(true)

    try {
      if (newName.trim() && newDescription.trim()) {
        await renameProject(Number(projectID), newName)
        await changeProjectDescription(
          Number(projectID),
          newDescription
        )
        toast.success("Updated project successfully!")
      } else if (newName.trim()) {
        await renameProject(Number(projectID), newName)
        toast.success('Updated project name successfully!')
      } else if (newDescription.trim()) {
        await changeProjectDescription(
          Number(projectID),
          newDescription
        )
        toast.success("Updated project description successfully!")
      }

      setNewName('')
      setNewDescription('')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save changes.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="w-full rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl">Project Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="group relative flex-grow">
            <label
              htmlFor="projectName"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Project Name
              </span>
            </label>
            <Input
              id="projectName"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder=""
              className="w-full"
            />
          </div>
          <div className="group relative flex-grow">
            <label
              htmlFor="projectDescription"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Description
              </span>
            </label>
            <Textarea
              id="projectDescription"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder=""
              className="w-full"
            />
          </div>
          <Button
            onClick={handleClick}
            disabled={isSaving}
            className="self-start"
          >
            <Save className="mr-2 size-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2">Remove Project</h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 size-4" />
                Permanently Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this project?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your project and remove all of its contents from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" asChild
                  onClick={handleDelete} disabled={isDeleting}>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
