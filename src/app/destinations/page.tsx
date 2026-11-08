"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Star } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";

async function fetchDestinations(): Promise<Destination[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load destinations (${res.status})`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "under-1000", label: "Under $1000" },
  { value: "1000-2000", label: "$1000 - $2000" },
  { value: "above-2000", label: "Above $2000" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A - Z" },
];

const DestinationsPage = () => {
  const [destinations, setDestinations] = React.useState<Destination[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [reloadToken, setReloadToken] = React.useState(0);
  const [category, setCategory] = React.useState<string | null>(null);
  const [priceRange, setPriceRange] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    fetchDestinations()
      .then((data) => {
        if (!active) return;
        setDestinations(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching destinations:", err);
        if (!active) return;
        setError(
          "Could not load destinations. Make sure the server is running and try again.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadToken]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setReloadToken((token) => token + 1);
  };

  const categories = React.useMemo(
    () => Array.from(new Set(destinations.map((item) => item.category))),
    [destinations],
  );

  const visible = React.useMemo(() => {
    let items = [...destinations];

    if (category && category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    if (priceRange && priceRange !== "all") {
      items = items.filter((item) => {
        const price = Number(item.price);
        if (priceRange === "under-1000") return price < 1000;
        if (priceRange === "1000-2000") return price >= 1000 && price <= 2000;
        return price > 2000;
      });
    }

    if (sortBy === "price-asc") {
      items.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      items.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name-asc") {
      items.sort((a, b) => a.destinationName.localeCompare(b.destinationName));
    }

    return items;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <main className="flex-1 bg-white px-4 py-10 sm:px-6 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-normal tracking-tight text-neutral-900 md:text-4xl">
          Explore All Destinations
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Find your perfect travel experience from our curated collection.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Select
            value={category}
            onValueChange={(value) => setCategory(String(value))}
          >
            <SelectTrigger className="h-10 w-full rounded-md border-neutral-200 bg-white px-3 text-xs font-medium tracking-wide text-neutral-500 uppercase">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={priceRange}
            onValueChange={(value) => setPriceRange(String(value))}
          >
            <SelectTrigger className="h-10 w-full rounded-md border-neutral-200 bg-white px-3 text-xs font-medium tracking-wide text-neutral-500 uppercase">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(String(value))}
          >
            <SelectTrigger className="h-10 w-full rounded-md border-neutral-200 bg-white px-3 text-xs font-medium tracking-wide text-neutral-500 uppercase">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-5 text-xs text-neutral-500">
          {loading
            ? "Loading destinations..."
            : error
              ? "Unable to load destinations"
              : `Showing ${visible.length} destination${visible.length === 1 ? "" : "s"}`}
        </p>

        {loading && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
              >
                <div className="aspect-[16/9] animate-pulse bg-neutral-100" />
                <div className="space-y-2.5 px-3.5 py-3">
                  <div className="h-2.5 w-1/3 animate-pulse rounded bg-neutral-100" />
                  <div className="h-3.5 w-2/3 animate-pulse rounded bg-neutral-100" />
                  <div className="h-2.5 w-1/2 animate-pulse rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center">
            <p className="text-sm font-medium text-neutral-800">
              Destinations could not be loaded
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-neutral-500">
              `The server at ${process.env.NEXT_PUBLIC_API_URL} did not respond. Start the backend
              and try again.`
            </p>
            <Button
              onClick={retry}
              className="mt-1 h-9 rounded-[3px] bg-brand px-4 text-sm font-medium text-white hover:bg-brand/90"
            >
              Try again
            </Button>
          </div>
        )}

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <div
              key={destination._id}
              className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={destination.imageUrl}
                  alt={destination.destinationName}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-[4px] bg-white px-2 py-1 text-[11px] font-medium text-neutral-800">
                  4.5
                  <Star className="size-2.5 fill-neutral-900 text-neutral-900" />
                </span>
              </div>
              <div>
                <div className="px-3.5 py-3">
                  <p className="flex items-center gap-1 text-[11px] text-neutral-500">
                    <MapPin className="size-3" strokeWidth={1.75} />
                    {destination.country}
                  </p>
                  <h2 className="mt-1.5 text-[15px] font-semibold text-neutral-900">
                    {destination.destinationName}
                  </h2>
                  <div className="mt-2.5 flex items-end justify-between gap-2">
                    <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                      <Clock className="size-3" strokeWidth={1.75} />
                      {destination.duration}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-neutral-900">
                      ${destination.price}
                      <span className="ml-0.5 text-[10px] font-normal text-neutral-500">
                        /Person
                      </span>
                    </span>
                  </div>
                </div>

                <div className="border-t border-neutral-200 px-3.5 py-2.5">
                  <Link
                    href={`/destinations/${destination._id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.06em] text-brand uppercase transition-colors hover:text-brand/80"
                  >
                    Book Now
                    <ArrowUpRight className="size-3" strokeWidth={2.25} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && !error && visible.length === 0 && (
          <p className="mt-10 text-center text-sm text-neutral-500">
            {destinations.length === 0
              ? "No destinations yet. Add your first destination to see it here."
              : "No destinations match your filters."}
          </p>
        )}
      </div>

      <Toaster />
    </main>
  );
};

export default DestinationsPage;
