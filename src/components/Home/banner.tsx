import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const searchFields = [
  { id: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { id: "date", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { id: "budget", label: "Budget", placeholder: "$0-$3000" },
  { id: "people", label: "People", placeholder: "5-10" },
]

export function Banner() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] w-full overflow-hidden">
      <Image
        src="/image/Banner.png"
        alt="Coastal village and turquoise bay surrounded by green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      <div className="relative flex min-h-[calc(100svh-5rem)] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-12 text-center md:pb-16">
          <h1 className="max-w-4xl text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.08] font-light tracking-[-0.02em] text-white">
            <span className="block">Discover Your</span>
            <span className="block">Next Adventure</span>
          </h1>

          <p className="mt-9 max-w-[38rem] text-base leading-relaxed text-white/90 md:text-lg">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              className="group inline-flex h-14 min-w-[200px] items-center justify-center gap-2 bg-brand px-8 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-brand/90"
            >
              Explore Now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <Link
              href="/destinations"
              className="inline-flex h-14 min-w-[200px] items-center justify-center bg-white/30 px-8 text-xs font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/40"
            >
              View Destination
            </Link>
          </div>
        </div>

        <form
          role="search"
          className="w-full border-t border-white/10 bg-white/15 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 divide-y divide-white/20 lg:grid-cols-[repeat(4,minmax(0,1fr))_15%] lg:divide-x lg:divide-y-0">
            {searchFields.map((field) => (
              <label
                key={field.id}
                className="flex cursor-text flex-col justify-center px-6 py-5"
              >
                <span className="text-lg font-semibold text-white">
                  {field.label}
                </span>
                <input
                  id={field.id}
                  name={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  className="mt-0.5 w-full bg-transparent text-sm text-white/80 placeholder:text-white/60 focus:outline-none"
                />
              </label>
            ))}

            <button
              type="submit"
              className="h-14 w-full bg-brand text-lg font-medium text-white transition-colors hover:bg-brand/90 lg:h-auto"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
