"use client"

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/auth-fetch";

type BookingDestination = {
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

const included = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({ destination }: { destination: BookingDestination }) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const [sending, setSending] = React.useState(false);

  const handaleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const departureDate = String(
      formData.get("departureDate") || destination.departureDate
    );

    const bookingData = {
      userId: user?.id ?? null,
      userName: user?.name ?? null,
      userEmail: user?.email ?? null,
      destinationId: destination._id,
      destinationName: destination.destinationName,
      country: destination.country,
      category: destination.category,
      price: destination.price,
      duration: destination.duration,
      imageUrl: destination.imageUrl,
      description: destination.description,
      departureDate,
      bookingDate: new Date(),
    };

    console.log("Booking payload:", bookingData);

    setSending(true);

    try {
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      console.log("Booking response:", data);

      if (!res.ok) {
        throw new Error(
          data?.error || `Failed to save booking (${res.status})`
        );
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setSending(false);
    }
  };


  return (
    <div>
      <aside className="h-fit rounded-md border border-neutral-200 p-5">
        <p className="text-xs text-neutral-500">Starting from</p>
        <p className="mt-1 text-[28px] leading-none font-semibold text-brand">
          ${destination.price}
        </p>
        <p className="mt-1.5 text-xs text-neutral-500">per person</p>

        <form onSubmit={handaleBooking}>
          <Input
          type="date"
          name="departureDate"
          aria-label="Departure date"
          defaultValue={destination.departureDate}
         
          className="mt-5 h-9 rounded-[3px] border-neutral-200 bg-[#f8f9fa] text-sm shadow-none [&::-webkit-calendar-picker-indicator]:hidden"
          />

          <Button
            type="submit"
            disabled={sending}
            className="mt-3 h-10 w-full gap-2 rounded-[3px] bg-brand text-sm font-medium text-white hover:bg-brand/90"
          >
           {sending ? "Booking..." : "Book Now"}
          <ArrowRight className="size-4" strokeWidth={1.75} />
          </Button>
        </form>

        <ul className="mt-5 space-y-2.5">
          {included.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[11px] text-neutral-600"
            >
              <Check
                className="mt-0.5 size-3 shrink-0 text-brand"
                strokeWidth={2.5}
              />
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default BookingCard;
