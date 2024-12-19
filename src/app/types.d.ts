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

type ToggleServer = {
    server: {
        name: string;
        status: string;
        projectId: string;
    };
    statusClass: string;
};

type DeleteServer = {
    server: {
        name: string
        projectId: string
        status: string
    }
}

type PageById = {
    params: {
        projectId: string
        serverName: string
    }
}