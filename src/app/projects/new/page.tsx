import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border font-bold p-6 rounded-lg shadow-lg space-y-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-center mb-4">Create New Project</h2>

                <Input label="Project name" />

                <Textarea label="Description" />
                <div className="flex justify-center">
                    <Button className="w-auto mx-auto">Create</Button>
                </div>
            </div>
        </div>
    )
}