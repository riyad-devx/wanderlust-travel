"use client"

import * as React from "react"
import { Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { authFetch } from "@/lib/auth-fetch"

export type Destination = {
  _id: string
  destinationName: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Island"]

const fieldClass =
  "h-10 rounded-[3px] border-neutral-200 bg-[#f8f9fa] px-3.5 text-sm shadow-none focus-visible:border-brand/60 focus-visible:ring-brand/20"

const labelClass = "text-[13px] font-semibold text-neutral-800"

type EditDestinationDialogProps = {
  destination: Destination
  onUpdated?: () => void
}

const EditDestinationDailog = ({
  destination,
  onUpdated,
}: EditDestinationDialogProps) => {
  const [open, setOpen] = React.useState(false)
  const [category, setCategory] = React.useState(destination.category)
  const [saving, setSaving] = React.useState(false)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) setCategory(destination.category)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as Record<string, string>

    setSaving(true)

    try {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!res.ok) {
        throw new Error(`Failed to update destination (${res.status})`)
      }

      toast.add({
        type: "success",
        title: "Destination updated",
        description: data.destinationName,
      })

      setOpen(false)
      onUpdated?.()
    } catch (error) {
      console.error("Error updating destination:", error)

      toast.add({
        type: "error",
        title: "Could not update destination",
        description: "Please check the fields and try again.",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-md border-neutral-300 px-3.5 text-sm font-normal text-neutral-800"
          >
            <Pencil className="size-3.5" strokeWidth={1.75} />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            {destination.destinationName} · {destination.country}
          </DialogDescription>
        </DialogHeader>

        <form
          id="edit-destination-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="edit-destinationName" className={labelClass}>
              Destination Name
            </Label>
            <Input
              id="edit-destinationName"
              name="destinationName"
              defaultValue={destination.destinationName}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-country" className={labelClass}>
                Country
              </Label>
              <Input
                id="edit-country"
                name="country"
                defaultValue={destination.country}
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-category" className={labelClass}>
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(String(value))}
              >
                <SelectTrigger
                  id="edit-category"
                  className="h-10 w-full rounded-[3px] border-neutral-200 bg-[#f8f9fa] px-3.5 text-sm"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item} className="text-sm">
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="category" value={category} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-price" className={labelClass}>
                Price (USD)
              </Label>
              <Input
                id="edit-price"
                name="price"
                inputMode="numeric"
                defaultValue={destination.price}
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-duration" className={labelClass}>
                Duration
              </Label>
              <Input
                id="edit-duration"
                name="duration"
                defaultValue={destination.duration}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-departureDate" className={labelClass}>
              Departure Date
            </Label>
            <Input
              id="edit-departureDate"
              name="departureDate"
              type="date"
              defaultValue={destination.departureDate}
              className={`${fieldClass} [&::-webkit-calendar-picker-indicator]:hidden`}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-imageUrl" className={labelClass}>
              Image URL
            </Label>
            <Input
              id="edit-imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={destination.imageUrl}
              className={fieldClass}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-description" className={labelClass}>
              Description
            </Label>
            <Textarea
              id="edit-description"
              name="description"
              defaultValue={destination.description}
              className="min-h-[104px] resize-none rounded-[3px] border-neutral-200 bg-[#f8f9fa] px-3.5 py-2.5 text-sm shadow-none focus-visible:border-brand/60 focus-visible:ring-brand/20"
            />
          </div>
        </form>

        <div className="flex justify-end gap-2 border-t border-neutral-200 pt-4">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                className="h-10 gap-1.5 rounded-[3px] border-red-200 bg-white px-4 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <X className="size-3.5" strokeWidth={2} />
                Cancel
              </Button>
            }
          />

          <Button
            type="submit"
            form="edit-destination-form"
            disabled={saving}
            className="h-10 gap-1.5 rounded-[3px] bg-brand px-4 text-sm font-medium text-white hover:bg-brand/90"
          >
            <Check className="size-3.5" strokeWidth={2.25} />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditDestinationDailog
