"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  Star,
} from "lucide-react"

import EditDestinationDailog from "@/components/Destination/EditDestinationDailog"
import { Toaster } from "@/components/ui/toast"
import DeleteDestinationnDialog from "@/components/Destination/DeleteDestinationnDialog"
import BookingCard from "@/components/Booking/bookingCard"



type Destination = {
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

const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
]

async function getDestination(id: string): Promise<Destination | null> {
  const tokenResponse = await fetch("/api/auth/token", {
    credentials: "include",
    cache: "no-store",
  })

  if (!tokenResponse.ok) {
    throw new Error(`Failed to get JWT (${tokenResponse.status})`)
  }

  const { token } = (await tokenResponse.json()) as { token?: string }

  if (!token) {
    throw new Error("Better Auth returned no JWT")
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to load destination (${res.status})`)
  }

  const data = await res.json()
  return data?.result ?? data ?? null
}

export default function DestinationDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [destination, setDestination] = React.useState<Destination | null>(null)
  const [loading, setLoading] = React.useState(true)

  const load = React.useCallback(async () => {
    if (!id) return

    try {
      setDestination(await getDestination(id))
    } catch (error) {
      console.error("Error fetching destination:", error)
    } finally {
      setLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    if (!id) return

    let active = true

    getDestination(id)
      .then((data) => {
        if (!active) return
        setDestination(data)
      })
      .catch((error) => {
        console.error("Error fetching destination:", error)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <main className="flex-1 bg-white px-4 py-10 sm:px-6 lg:px-14">
        <div className="mx-auto w-full max-w-6xl text-sm text-neutral-500">
          Loading destination...
        </div>
      </main>
    )
  }

  if (!destination) {
    return (
      <main className="flex-1 bg-white px-4 py-10 sm:px-6 lg:px-14">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm text-neutral-500">Destination not found.</p>
          <Link
            href="/destinations"
            className="mt-4 inline-flex items-center gap-2 text-sm text-brand"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-white px-4 py-8 sm:px-6 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-800"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            Back to Destinations
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <EditDestinationDailog destination={destination} onUpdated={load} />
            <DeleteDestinationnDialog
              id={destination._id}
              name={destination.destinationName}
            />
          </div>
        </div>

        <div className="mt-4 aspect-[16/7] overflow-hidden rounded-md bg-neutral-100 md:aspect-[695/255]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={destination.imageUrl}
            alt={destination.destinationName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_250px] lg:gap-8">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-neutral-500">
              <MapPin className="size-3.5" strokeWidth={1.75} />
              {destination.country}
            </p>

            <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-950 md:text-[2rem]">
              {destination.destinationName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5">
                <Star className="size-3.5 fill-brand text-brand" />
                <span className="font-semibold text-neutral-900">4.9</span>
                <span className="text-neutral-500">(234 reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" strokeWidth={1.75} />
                {destination.duration}
              </span>
            </div>

            <section className="mt-7">
              <h2 className="font-serif text-lg font-semibold text-neutral-950">
                Overview
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {destination.description}
              </p>
            </section>

            <section className="mt-6">
              <h2 className="font-serif text-lg font-semibold text-neutral-950">
                Highlights
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {destination.description}
              </p>

              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-600"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-brand"
                      strokeWidth={2.25}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
            <BookingCard destination={destination}/>
        </div>
      </div>

      <Toaster />
    </main>
  )
}
