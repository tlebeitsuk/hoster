'use client'
import { auth } from '@/lib/auth-client'
import { format } from 'date-fns'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Dashboard({ projects }: { projects: Project[] }) {
  const { data: session } = auth.useSession()

  const latestProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 9)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {session?.user?.name}
        </h1>
        <p className="text-muted-foreground">
          {projects.length === 0 ? '' : 'Latest projects'}
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-card rounded-lg p-8 border shadow-sm">
          <h2 className="text-2xl font-semibold">No projects yet</h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Create a project to host your own services.
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/projects/new" className="text-white">
              New project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProjects.map((project) => (
            <Link
              href={`/dashboard/${project.id}`}
              key={project.id}
              className="group block"
            >
              <div className="h-full p-6 bg-card border rounded-lg transition-all duration-200 hover:shadow-lg hover:border-primary/50 group-hover:scale-[1.02] flex flex-col">
                <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-muted-foreground mt-3 line-clamp-2">
                    {project.description}
                  </p>
                )}
                <div className="mt-auto pt-3 text-sm text-muted-foreground flex items-center gap-2">
                  Updated {format(project.updatedAt, 'MMM d, yyyy')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
