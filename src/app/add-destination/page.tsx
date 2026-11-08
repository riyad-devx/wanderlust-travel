
"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
import { Toaster, toast } from "@/components/ui/toast"
import { authFetch } from "@/lib/auth-fetch"

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Island"]

const fieldClass = "h-10 rounded-[3px] border-neutral-200 bg-[#f8f9fa] px-3.5 text-sm shadow-none focus-visible:border-brand/60 focus-visible:ring-brand/20"

const AddDestinationPage = () => {
  const [category, setCategory] = React.useState("Beach")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    try {
      const data = Object.fromEntries(new FormData(form)) as Record<
        string,
        string
      >

      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error(`Failed to add destination (${res.status})`)
      }

      let result: unknown = null
      try {
        const text = await res.text()
        result = text ? JSON.parse(text) : null
      } catch {
        result = null
      }

      console.log("Destination added:", result)
      console.log("Form Data:", data)

      toast.add({
        type: "success",
        title: "Travel package added",
      })

      form.reset()
      setCategory("Beach")
    } catch (error) {
      console.error("Error adding destination:", error)

      toast.add({
        type: "error",
        title: "Could not add travel package",
        description: "Please check the fields and try again.",
      })
    }
  }

  return (
    <main className="flex-1 bg-white px-6 py-8 lg:px-8 lg:py-10">
      <h1 className="text-5xl ml-8 font-normal tracking-tight text-neutral-900">
        Add New Travel Package
      </h1>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-[560px]">
        <Card className="gap-5 rounded-[3px] py-6 ring-neutral-200 shadow-sm [--card-spacing:1.5rem]">
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="destinationName" className="text-[13px] font-semibold text-neutral-800">
                Destination Name
              </Label>
              <Input id="destinationName" name="destinationName" placeholder="Bali Paradise" className={fieldClass} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="country" className="text-[13px] font-semibold text-neutral-800">
                  Country
                </Label>
                <Input id="country" name="country" placeholder="Indonesia" className={fieldClass} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-[13px] font-semibold text-neutral-800">
                  Category
                </Label>
                <Select value={category} onValueChange={(value) => setCategory(String(value))}>
                  <SelectTrigger id="category" className="h-10 w-full rounded-[3px] border-neutral-200 bg-[#f8f9fa] px-3.5 text-sm">
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
                <Label htmlFor="price" className="text-[13px] font-semibold text-neutral-800">
                  Price (USD)
                </Label>
                <Input id="price" name="price" inputMode="numeric" placeholder="e.g., 1299" className={fieldClass} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="duration" className="text-[13px] font-semibold text-neutral-800">
                  Duration
                </Label>
                <Input id="duration" name="duration" placeholder="e.g., 7 Days / 6 Nights" className={fieldClass} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="departureDate" className="text-[13px] font-semibold text-neutral-800">
                Departure Date
              </Label>
              <Input id="departureDate" name="departureDate" type="date" className={`${fieldClass} [&::-webkit-calendar-picker-indicator]:hidden`} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="imageUrl" className="text-[13px] font-semibold text-neutral-800">
                Image URL
              </Label>
              <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.jpg" className={fieldClass} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-[13px] font-semibold text-neutral-800">
                Description
              </Label>
              <Textarea id="description" name="description" placeholder="Describe the travel experience..." className="min-h-[104px] resize-none rounded-[3px] border-neutral-200 bg-[#f8f9fa] px-3.5 py-2.5 text-sm shadow-none focus-visible:border-brand/60 focus-visible:ring-brand/20" />
            </div>
          </CardContent>

          <CardFooter className="justify-end gap-2 border-t border-neutral-200 bg-white px-6 py-4">
            <Button type="submit" className="h-10 gap-1.5 rounded-[3px] bg-brand px-4 text-sm font-medium text-white hover:bg-brand/90">
              <Plus className="size-3.5" strokeWidth={2} />
              Add Travel Package
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Toaster />
    </main>
  )
}

export default AddDestinationPage
