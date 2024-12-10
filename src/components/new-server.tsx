'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { newServer } from '@/data/projects/new-server'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Database, Globe, Server } from 'lucide-react'

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
          protocol: 'simplestreams',
          server: 'https://images.linuxcontainers.org',
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

  const serverOptions = [
    { id: 'ubuntu', label: 'Ubuntu', icon: Server },
    { id: 'wordpress', label: 'Wordpress', icon: Globe },
    { id: 'postgresql', label: 'PostgreSQL', icon: Database },
    { id: 'mysql', label: 'MySQL', icon: Database },
  ]

  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center">New Service</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Launch a new database or server.
          </p>
        </div>
        <RadioGroup className="grid-cols-2" defaultValue="ubuntu">
          {serverOptions.map(({ id, label, icon: Icon }) => (
            <label
              key={id}
              className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
            >
              <RadioGroupItem
                id={id}
                value={id}
                className="sr-only after:absolute after:inset-0"
              />
              <Icon className="opacity-60" size={20} aria-hidden="true" />
              <p className="text-xs font-medium leading-none text-foreground">
                {label}
              </p>
            </label>
          ))}
        </RadioGroup>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="group relative">
            <label
              htmlFor="name"
              className="absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Server Name
              </span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder=""
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
