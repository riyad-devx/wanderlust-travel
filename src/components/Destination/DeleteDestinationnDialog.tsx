"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, Trash2, TriangleAlert } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { authFetch } from "@/lib/auth-fetch"

type DeleteDestinationDialogProps = {
  id: string
  name?: string
  onDeleted?: () => void
}

const DeleteDestinationnDialog = ({
  id,
  name,
  onDeleted,
}: DeleteDestinationDialogProps) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  const handleDelete = async () => {
    setDeleting(true)

    try {
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error(`Failed to delete destination (${res.status})`)
      }

      toast.add({
        type: "success",
        title: "Destination deleted",
        description: name ? `${name} has been removed.` : "The trip has been removed.",
      })

      setOpen(false)
      onDeleted?.()
      router.push("/destinations")
    } catch (error) {
      console.error("Error deleting destination:", error)

      toast.add({
        type: "error",
        title: "Could not delete destination",
        description: "Something went wrong. Please try again.",
      })
      setDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-md border-red-200 px-3.5 text-sm font-normal text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-3.5" strokeWidth={1.75} />
            Delete
          </Button>
        }
      />

      <AlertDialogContent className="gap-5 p-5 sm:max-w-md">
        <AlertDialogHeader className="gap-1.5">
          <AlertDialogMedia className="mb-3 size-12 rounded-full bg-red-50 text-red-600 ring-1 ring-red-100">
            <TriangleAlert className="size-6" strokeWidth={1.9} />
          </AlertDialogMedia>

          <AlertDialogTitle className="text-lg font-semibold text-neutral-900">
            Delete this destination?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[13px] leading-relaxed text-neutral-500">
            {name ? (
              <>
                <span className="font-semibold text-neutral-800">{name}</span> will
                be permanently removed from your destinations.
              </>
            ) : (
              "This destination will be permanently removed from your list."
            )}{" "}
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-1 -mx-5 -mb-5 rounded-b-xl border-neutral-200 bg-neutral-50 px-5 py-3.5">
          <AlertDialogCancel
            disabled={deleting}
            className="h-10 rounded-[3px] border-neutral-300 px-4 text-sm font-medium text-neutral-700"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="h-10 gap-1.5 rounded-[3px] bg-red-600 px-4 text-sm font-medium text-white shadow-none hover:bg-red-700 focus-visible:ring-red-500/30 border-transparent"
          >
            {deleting ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2.25} />
            ) : (
              <Trash2 className="size-4" strokeWidth={2.25} />
            )}
            {deleting ? "Deleting..." : "Delete Destination"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDestinationnDialog
