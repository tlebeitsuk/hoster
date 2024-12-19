type Project = {
    id: number
    title: string
    description?: string
    createdAt: Date
    updatedAt: Date
}

type Server = {
    id: string
    name: string
    status: ServerStatus
    created_at: Date
    last_used_at: Date
    state?: ServerState
    projectId: string
}