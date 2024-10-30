import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border font-bold p-6 rounded-lg shadow-lg space-y-4 w-full max-w-lg">
                <h2 className="text-xl font-semibold text-center mb-4">Create New Project</h2>
                <Label htmlFor="input">Project name</Label>
                <Input />
                <Label htmlFor="textArea">Description</Label>
                <Textarea  />
                <div className="flex justify-center">
                    <Button className="w-auto mx-auto">Create</Button>
                </div>
            </div>
        </div>
    )
}