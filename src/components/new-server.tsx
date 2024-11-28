'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { newServer } from '@/data/projects/new-server'
import { toast } from 'sonner'

export default function NewServer({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const config = {
        name,
        source: {
          type: 'image',
          alias: 'ubuntu/22.04',
        },
      }

      await newServer(projectId, config)
      toast.success('Server created successfully')
      router.push(`/dashboard/${projectId}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to create server')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-center">Create New Server</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Deploy a new Ubuntu container
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Label htmlFor="name">Server Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-server"
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Server'}
          </Button>
        </form>
      </div>
    </div>
  )
}
