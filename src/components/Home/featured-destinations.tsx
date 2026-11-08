"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  price: string;
  duration: string;
  imageUrl: string;
};

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`);

        if (!res.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const data = await res.json();

        setDestinations((Array.isArray(data) ? data : []).slice(0, 5));
      } catch (error) {
        console.error("Destination fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(0, destinations.length - 2))
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <section className="py-16 text-center">
        Loading destinations...
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              Featured Destinations
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="flex items-center gap-3 border border-sky-200 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-sky-600 transition hover:bg-sky-500 hover:text-white"
          >
            All Destinations <span>→</span>
          </Link>
        </div>

        {/* Carousel */}
        {destinations.length > 0 ? (
          <>
            <div className="overflow-hidden">
              <div
                className="flex gap-5 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 33.333}%)`,
                }}
              >
                {destinations.map((destination) => {
                  const id = destination._id;
                  const name = destination.destinationName || "Destination";
                  const image = destination.imageUrl;
                  const country = destination.country || "Unknown";
                  const price = destination.price || 0;
                  const rating = 4.5;
                  const duration = destination.duration || "7 Days / 6 Nights";

                  return (
                    <div
                      key={id}
                      className="w-[85%] shrink-0 sm:w-[48%] lg:w-[32%]"
                    >
                      {/* Image */}
                      <div className="group relative h-48 overflow-hidden bg-gray-100 md:h-52">
                        {image && (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}

                        {/* Rating */}
                        <div className="absolute right-2 top-2 flex items-center gap-1 bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800">
                          <span className="text-yellow-500">★</span>
                          {rating}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="py-3">
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                          <span>◎</span>
                          {country}
                        </div>

                        <div className="mt-1 flex items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {name}
                          </h3>

                          <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                            ${Number(price).toLocaleString()}
                            <span className="text-[9px] font-normal text-gray-500">
                              /Person
                            </span>
                          </p>
                        </div>

                        <p className="mt-1 text-[10px] text-gray-500">
                          ▢ {duration}
                        </p>

                        <Link
                          href={`/destinations/${id}`}
                          className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-sky-600 hover:text-sky-800"
                        >
                          Book Now <span>↗</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer / Pagination */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-xs text-gray-800">
                {currentIndex + 1}/{destinations.length}
              </span>

              <div className="h-px flex-1 bg-gray-200" />

              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= destinations.length - 2}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                →
              </button>
            </div>
          </>
        ) : (
          <p className="py-10 text-center text-sm text-gray-500">
            No featured destinations found.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;