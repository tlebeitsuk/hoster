"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { newProject } from "@/data/projects/new-project";
import { useRouter } from "next/navigation"; 

export default function Page() {
    const [title, setTitle] = useState<string>(""); 
    const [description, setDescription] = useState<string>(""); 
    const router = useRouter();  

    const handleCreateProject = async () => {
        try {
            const createdProject = await newProject(title, description);
            router.push(`/dashboard/${createdProject.title}`);
            router.refresh();
        } catch (error) {
            console.error("Error creating project:", error);
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border p-6 rounded-lg shadow-lg space-y-4 w-full max-w-lg">
                <h2 className="text-xl font-bold text-center mb-4">Create a new project</h2>
                <Label htmlFor="title">Project name</Label>
                <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <div className="flex justify-center">
                    <Button className="w-auto mx-auto" onClick={handleCreateProject}>Create</Button>
                </div>
            </div>
        </div>
    );
}
