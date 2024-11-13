
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function ProjectPage() {
    const { id } = useParams(); 
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                try {
                    const response = await fetch(`/api/projects/${id}`);
                    const data = await response.json();
                    setProject(data);
                } catch (error) {
                    console.error("Failed to fetch project:", error);
                }
            };
            fetchProject();
        }
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Project: {project.title}</h1>
            <p><strong>Description:</strong> {project.description}</p>
        </div>
    );
}
