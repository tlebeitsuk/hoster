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
import { renameProject } from '@/data/projects/project-settings'
import { Textarea } from './ui/textarea'

export default function Component({ params }) {
  const [newName, setNewName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const router = useRouter()

  console.log(params)

  const projects = params.projects
  const projectID = params.projectID
  const thisProject = projects.find((p) => p.id === Number(projectID))

  console.log(thisProject)

  const handleRenameProject = async () => {
    if (!newName.trim()) {
      setErrorMessage('Project name cannot be empty.')
      return
    }

    setIsSaving(true)
    setErrorMessage('')
    try {
      const updatedProject = await renameProject(Number(projectID), newName)
      console.log('Project renamed successfully:', updatedProject)
      setNewName('')
      router.refresh()
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to rename project.')
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
          <div className="group relative">
            <label
              htmlFor="projectName"
              className="absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
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
          <div className="group relative">
            <label
              htmlFor="projectDescription"
              className="absolute top-0 block translate-y-2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium has-[+textarea:not(:placeholder-shown)]:text-foreground"
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
            onClick={handleRenameProject}
            disabled={isSaving}
            className="self-start"
          >
            <Save className="mr-2 size-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
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
                <Button variant="destructive" asChild>
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
