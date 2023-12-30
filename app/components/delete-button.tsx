import { Button } from "@/components/ui/button"
import { deletePost } from "../lib/actions"
import { Trash } from "lucide-react"

export async function DeleteButton({ id }: { id: string }) {
    const onClick = async () => {
        await deletePost(id)
    }

    return (
        <Button onClick={onClick} className='ml-6' variant={'destructive'}>
            <Trash size={24} />
        </Button>
    )
}